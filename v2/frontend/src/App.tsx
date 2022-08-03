import { useEffect, useState } from 'react';
import Loading from './components/loading/loading';
import Nav from './components/nav';
import { restore } from './redux/authSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import Router from './routes';

function App() {
  const dispatch = useAppDispatch();

  const [loaded, setLoaded] = useState(false);
  const user = useAppSelector(state => state.auth.user);
  const status = useAppSelector(state => state.auth.status);

  useEffect(() => {
    if (loaded) return;
    (async () => {
      await dispatch(restore());
      setLoaded(true);
      console.log('RUNNING')
    })()
  }, [loaded, dispatch]);

  return (
    <>
      <header className="header">
        <Nav />
      </header>
      {status === 'loading' && <Loading />}
      <Router user={user} />
    </>
  );
}

export default App;

import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

function DemoButton() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const credential = 'demo';
  const password = 'password';

  if (user) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(login({ credential, password }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Demo User</button>
    </form>
  );
}

export default DemoButton;

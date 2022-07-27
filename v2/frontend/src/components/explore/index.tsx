import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { User } from "../../redux/models";
import { getPosts } from "../../redux/postsSlice";

function ExplorePage({ user }: { user: User | undefined }) {
  const dispatch = useAppDispatch();

  const [skip] = useState(0);
  const [take] = useState(10);
  const [loaded, setLoaded] = useState(false);

  const posts = useAppSelector(state => state.posts.posts);
  const myPosts = useAppSelector(state => state.posts.myPosts);

  useEffect(() => {
    if (loaded) return;
    (async () => {
      const posts = await dispatch(getPosts({ skip, take }));
      setLoaded(true);
      console.log(posts);
    })();
  }, [skip, take, loaded, dispatch]);

  return (
    <div className="main">
      <h1>Explore</h1>
      {posts.length > 0 && (
        <div className="posts">
          {posts.map(post => (
            <div key={post.ID} className="post">
              <h2>{post.title}</h2>
            </div>
          ))}
        </div>
      )}
      {myPosts.length > 0 && (
        <div className="posts">
          {myPosts.map(post => (
            <div key={post.ID} className="post">
              <h2>{post.title}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExplorePage;
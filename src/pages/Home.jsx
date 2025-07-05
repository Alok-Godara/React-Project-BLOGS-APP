import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Logo } from "../components/index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const [Posts, setPosts] = useState([]);

  const userData = useSelector((state) => state.auth.userData);

  const isLoggedIn = useSelector((state) => state.auth.status);

  const [Loading , setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      appwriteService.getPosts().then((posts_appwrite) => {
        if (posts_appwrite) {
          const posts = posts_appwrite.documents
          setPosts(
            posts.filter((post) => post.userId === userData.$id)
          );
        }
        setLoading(false);
      });
    }
  }, [userData]);

  if(Loading && isLoggedIn) return <div>Loading...</div>

  if (isLoggedIn === false) {
    return (
      <div className="w-full py-8 mt-4 text-center h-[20vh]">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full flex flex-col items-center justify-center">
              <Logo />
              <Link to="/login" className="mt-4">
                <h1 className="text-2xl font-bold hover:text-gray-500 cursor-pointer">
                  Please login to read posts !!!
                </h1>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (Posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center h-[20vh]">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full flex flex-col items-center justify-center">
              <Logo />
              <Link to='/add-post'>
                <h1 className="text-2xl font-bold hover:text-gray-500 cursor-pointer m-5">
                  Others have shared their stories—yours is still waiting to be
                  told.
                </h1>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 flex flex-1">
      <Container>
        <div className="flex flex-wrap">
          {Posts.map((post) => (
            <div key={post.$id} className="p-3 w-1/5">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;

import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { Logo } from "../components/index";

function AllPosts() {

  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, [posts]);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center h-[20vh]">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full flex flex-col items-center justify-center">
              <Logo />
              <h1 className="text-2xl font-bold hover:text-gray-500 cursor-pointer m-5">
                No posts available, please be the first to create a post !!!
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 flex-1">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-3 w-1/5">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredimage);
        navigate("/");
      }
    });
  };

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  return post ? (
    <div className="py-8 w-full h-[85vh]">
      <Container>
        <div className="w-full flex gap-20 mb-4">
          <img
            src={
              appwriteService.getFilePreview(post.featuredimage) === URL
                ? appwriteService.getFilePreview(post.featuredimage)
                : "https://i.postimg.cc/NMH975qJ/image.png"
            }
            alt={post.title}
            className="rounded-xl object-contain h-40"
          />

          <div className="flex flex-col">
            <div className="w-full my-6 ">
              <h1 className="text-4xl font-bold">{post.title}</h1>
            </div>
            {isAuthor && (
              <div className="flex w-full">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    bgColor="bg-green-500"
                    className="mr-3 cursor-pointer hover:bg-green-700"
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-500"
                  className="cursor-pointer hover:bg-red-700"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="browser-css mt-5">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}

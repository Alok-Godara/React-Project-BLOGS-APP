import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function Postcard({ $id, title, featuredimage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-500 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredimage) === URL
                ? appwriteService.getFilePreview(featuredimage)
                : "https://i.postimg.cc/NMH975qJ/image.png"}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default Postcard;

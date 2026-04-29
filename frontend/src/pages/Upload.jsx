import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, logoutUser } from "../api/auth.api";
import { createPost } from "../api/post.api";

const Upload = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 USER FETCH
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        setUser(res.data.user);
      } catch {
        console.log("User fetch failed");
      }
    };
    fetchUser();
  }, []);

  // 🔥 FILE SELECT
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // 🔥 UPLOAD API CALL
  const handleUpload = async () => {
    if (!image) {
      alert("Select image first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);

      const res = await createPost(formData);

      setPost(res.post);

    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-4 md:p-10">

        {/* HEADER */}
        <h1 className="text-xl font-semibold">
          {user ? `Hello, ${user.username} 👋` : "Loading..."}
        </h1>

        <p className="text-gray-500 mb-8 text-sm md:text-base">
          Transform your visuals into captions using AI.Captioner
        </p>

        {/* UPLOAD BOX */}
        <div className="border-2 border-dashed border-indigo-300 rounded-2xl p-6 md:p-12 text-center bg-white">

          <div className="text-purple-600 text-3xl mb-3">
            <i className="ri-upload-cloud-2-line"></i>
          </div>

          {/* HIDDEN INPUT */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />

          <h2 className="text-base md:text-lg font-semibold mb-2">
            Upload your images
          </h2>

          <p className="text-gray-500 mb-6 text-sm md:text-base">
            Drag & drop or click to upload images
          </p>

          {/* FILE NAME */}
          {image && (
            <p className="text-sm text-gray-600 mb-4">
              Selected: {image.name}
            </p>
          )}

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row justify-center gap-3">

            {/* SELECT BUTTON */}
            <button
              onClick={() => document.getElementById("fileInput").click()}
              className="bg-purple-600 text-white px-6 py-2 rounded-md"
            >
              Select Image
            </button>

            {/* UPLOAD BUTTON */}
            <button
              onClick={handleUpload}
              className="bg-black text-white px-6 py-2 rounded-md flex items-center justify-center"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <i className="ri-loader-4-line animate-spin"></i>
                  Generating...
                </span>
              ) : (
                "Generate Caption"
              )}
            </button>

          </div>
        </div>

        {/* 🔥 RESULT CARD */}
        {post && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto">

            <img
              src={post.image}
              alt="uploaded"
              className="w-full rounded-lg mb-4"
            />

            <p className="text-gray-700 text-sm leading-relaxed">
              {post.caption}
            </p>

          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
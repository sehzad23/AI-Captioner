import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Home = () => {
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* LEFT */}
        <div className="lg:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Generate <span className="text-purple-600">Smart Captions</span>{" "}
            <br />
            from Images using AI
          </h1>

          <p className="text-gray-500 mb-6">
            Upload any image and instantly get creative AI-powered captions.
          </p>

          <div className="flex gap-4">
            {
              isLoggedIn ? null : (
                <>
                 <button
              onClick={() => navigate("/register")}
              className="cursor-pointer bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
            >
              Sign Up
            </button>

            <button
              onClick={() => navigate("/login")}
              className="cursor-pointer bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300"
            >
              Login
            </button>
                </>
              )
            }
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:w-1/2 shadow-md p-5 rounded-xl border border-gray-300">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2"
            alt="AI"
            className="rounded-2xl shadow-lg h-[500px] w-full"
          />

          <div className=" w-full rounded-xl border border-gray-300 mt-3">
            <div className="flex justify-between px-5  mt-5">
              <h5 className="font-bold uppercase text-[12px] text-purple-600">
                Sugessted Caption
              </h5>
              <h5 className="font-bold  text-[12px]">98.4% Confidance</h5>
            </div>
            <p className="px-5 italic mb-2 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              ipsam pariatur perspiciatis unde saepe. Obcaecati?
            </p>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-6xl mx-auto mt-20 text-center px-4">
        <div className=" h-50 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Unmatched Precision
          </h2>

          <p className="text-gray-500">
            Our AI generates high-quality captions with deep context
            understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARD 1 */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-start">
            <div className="text-purple-500 text-3xl">
              <i className="ri-bard-line"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Powered Captions</h3>
            <p className="text-gray-500 text-sm text-start">
              Generate captions instantly using advanced AI models.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-start">
            <div className="text-purple-500 text-3xl">
              <i className="ri-git-repository-private-line"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure User Access</h3>
            <p className="text-gray-500 text-sm text-start">
              Your data is safe with authentication and secure storage.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-start">
            <div className="text-purple-500 text-3xl">
              <i className="ri-wireless-charging-line"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">Fast & Easy Upload</h3>
            <p className="text-gray-500 text-sm text-start">
              Upload images quickly and get results within seconds.
            </p>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="max-w-6xl mx-auto mt-20 px-4">
        <div className="bg-purple-700 text-white rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10 min-h-[70vh]">
          {/* LEFT */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Ready to transform your content?
            </h2>

            <p className="text-purple-200 mb-6">
              Join thousands of users generating captions with AI.
            </p>

            {
              isLoggedIn ? null : (<button
              onClick={() => navigate("/register")}
              className="cursor-pointer bg-white text-purple-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200"
            >
              Get Started
            </button>)
            }
          </div>

          {/* RIGHT */}
          <div className="flex-1 bg-purple-600 p-6 rounded-2xl border border-purple-500 w-full max-w-sm">
            <div className="border-2 border-dashed border-purple-400 rounded-xl h-40 flex flex-col items-center justify-center mb-4">
              <div className="text-purple-500 text-3xl">
                <i className="ri-upload-cloud-2-line"></i>
              </div>
              <p className="text-purple-200 text-sm">Upload Image</p>
            </div>

            <div className="h-2 bg-purple-500 rounded-full">
              <div className="h-2 bg-white w-1/2 rounded-full"></div>
            </div>
            <p className="text-center mt-3">Processing image...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

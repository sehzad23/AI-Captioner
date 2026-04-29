import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { getMe } from "../api/auth.api";
import { deleteUser } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Profile = ({ onClose }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const confirmDelete = () => {
    const toastId = "delete-confirm";

    toast.info(
      <div className="flex flex-col gap-3">
        <p>Are you sure you want to delete your account?</p>
        <div className="flex gap-2">
          <button
            type="button"
            className="px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            onClick={async () => {
              toast.dismiss(toastId);
              await deleteAccount();
            }}
          >
            Yes
          </button>
          <button
            type="button"
            className="px-3 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
            onClick={() => toast.dismiss(toastId)}
          >
            No
          </button>
        </div>
      </div>,
      {
        toastId,
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      }
    );
  };

useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        setUser(res.data.user); // 🔥 important
      } catch (error) {
        console.log("User fetch failed");
      }
    };

    fetchUser();
  }, []);

const deleteAccount = async () => {
  try {
    await deleteUser();

    toast.success("Account deleted");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    onClose();
    navigate("/"); // ya home
  } catch (error) {
    toast.error(error.response?.data?.message || "Unable to delete account.");
    console.log(error.response?.data?.message);
  }
};

// user delete function
const handleDelete = () => {
  confirmDelete();
};

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      
      {/* Modal Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* Profile Icon */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600 mb-4">
            {user?`${user.username[0]}` : "Loading"}
          </div>

          {/* Username */}
         <h1 className="text-xl font-semibold">{user ?`${user.username}`  : "Loading"}</h1>

          {/* Email */}
          <p className="text-gray-500 text-sm mb-6">
            {user ? `${user.email}` : "Loading" }
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          
          <button
            onClick={handleDelete}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Delete Account
          </button>

        </div>

      </div>
    </div>
  );
};

export default Profile;
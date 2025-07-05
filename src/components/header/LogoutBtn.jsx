import { useDispatch, useSelector } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Loading, setLoading] = useState(true);

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData?.name) {
      setLoading(false);
    }
  }, [userData]);

  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full"
      onClick={logoutHandler}
    >
      Logout - {Loading ? "USERNAME" : userData.name}
    </button>
  );
}

export default LogoutBtn;

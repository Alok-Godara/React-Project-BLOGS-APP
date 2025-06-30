import { useDispatch, useSelector } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };

  const userName = useSelector((state) => state.auth.userData?.name);

  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full"
      onClick={logoutHandler}
    >
      Logout - {userName}
    </button>
  );
}

export default LogoutBtn;

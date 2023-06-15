import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";
import { getWorkouts } from "../features/WorkoutSlice";

export const LogoutModal = ({ setShowLogout }) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    setShowLogout(false);
    dispatch(getWorkouts([]));
    // navigate("/login", { replace: true });
  };
  return (
    <>
      <div className="bg-zinc-800 rounded-sm text-white flex flex-col items-center justify-center h-44 absolute  w-96 ">
        <h1 className="text-md mb-8">Log Out ?</h1>
        <div className="flex  w-52 items-center justify-between">
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-700 w-24 p-2 my-1">
            Yes
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 w-24 p-2"
            onClick={() => setShowLogout(false)}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

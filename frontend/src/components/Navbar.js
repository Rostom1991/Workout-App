import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ setShowLogout }) {
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.user.email);
  // console.log(userEmail);

  return (
    <header className="bg-white shadow-xl z-10 sticky top-0 flex justify-around items-center">
      <div className="  py-2 max-w-xl">
        <Link to="/">
          <h1 className=" font-logo hover:text-black duration-700 delay-150 ease-out rounded-r-full px-2 hover:shadow-sm hover:bg-teal-200">
            WorkoutApp
          </h1>
        </Link>
      </div>
      <div className="flex">
        <div className=" text-teal-700 rounded p-2 font-semibold text-sm mr-2 ">
          <h1> {userEmail ? userEmail : null} </h1>
        </div>
        <div
          onClick={() =>
            userEmail
              ? setShowLogout(true)
              : navigate("/login", { replace: true })
          }
          className="  text-red-700 underline underline-offset-2  border-none cursor-pointer  font-semibold flex items-center  text-xs ">
          <h1> {userEmail ? "Logout" : "Login"} </h1>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

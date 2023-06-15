import { LogoutModal } from "./LogoutModal";

function Backdrop({ showLogout, setShowLogout }) {
  return (
    <div
      className="bg-gray-800 bg-opacity-50 w-full flex justify-center items-center  h-screen  z-10  "
      onClick={() => setShowLogout(false)}>
      <LogoutModal showLogout={showLogout} setShowLogout={setShowLogout} />
    </div>
  );
}

export default Backdrop;

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const { logOut, currentUser } = useAuth();

  const menuHandler = () => {
    setNav(!nav);
  };
  const logOutHandler = () => {
    localStorage.clear("access_token");
    logOut();
  };
  return (
    <div className=" shadow">
      <nav className="p-5 container mx-auto md:flex md:items-center md:justify-between">
        <div className="flex justify-between items-center ">
          <Link
            to="/"
            className="text-2xl hover:text-4xl delay-200 transition-all duration-300 ease-in-out  font-serif cursor-pointer"
          >
            Sports Zone
          </Link>

          <span
            className="text-3xl cursor-pointer mx-2 md:hidden block"
            onClick={menuHandler}
          >
            <HiMenu />
          </span>
        </div>
        <ul
          className={`md:flex md:items-center bg-base-100 overflow-hidden z-40 md:z-auto absolute md:sticky  w-full left-0  md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100   transition-all ease-in duration-500 gap-2 ${
            nav ? "top-[70px]" : "top-[-400px]"
          }`}
        >
          <li className="me-2">
            <Link to="/">Home</Link>
          </li>
          <li className="me-2">
            <Link to="/allClass">All Class</Link>
          </li>
          <li className="me-2">
            <Link to="/instructors">Instructors</Link>
          </li>
          <li className="me-2">
            <Link to="/dashbord">Dashbord</Link>
          </li>
          {currentUser?.email ? (
            <>
              <li className="me-2">
                <div className="avatar">
                  <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={currentUser.photoURL}
                      title={currentUser.displayName}
                      alt={currentUser.displayName}
                    />
                  </div>
                </div>
              </li>
              <li className="me-2">
                <button onClick={logOutHandler} className="my-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="me-2 ">
              <button className="my-btn">
                <Link to="/login">Login</Link>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;

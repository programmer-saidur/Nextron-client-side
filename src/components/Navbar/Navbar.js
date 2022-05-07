import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/bolt.gif";
import CustomLink from "../Shared/CustomLink/CustomLink";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import useNavLinks from "../../hooks/useNavLinks";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navLinks] = useNavLinks("navLinks.json");
  const [userNavLinks] = useNavLinks("userNavLinks.json");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="px-4 py-2 mx-auto  md:px-20 z-10 lg:px-20 sticky top-0 bg-realBlack  border-b-2 border-gray-700 ">
      <div className="relative flex items-center justify-between">
        <Link to="/" className="inline-flex items-center w-1/2 md:w-1/12">
          <img src={logo} alt="" className=" h-16 w-1/2 rounded-xl" />
          <span className="italic text-xl font-bold tracking-widest text-slate-100 uppercase">
            Nextron!
          </span>
        </Link>
        <ul className=" items-center hidden space-x-8 mr-8 lg:flex">
          {user
            ? userNavLinks.map((nav) => (
                <li key={nav.id}>
                  <CustomLink
                    to={nav.to}
                    className="font-medium tracking-wide text-gray-100 transition-all duration-200 hover:scale-150 hover:text-blue-300 active:scale-95"
                  >
                    {nav.name}
                  </CustomLink>
                </li>
              ))
            : navLinks.map((nav) => (
                <li key={nav.id}>
                  <CustomLink
                    to={nav.to}
                    className="font-medium tracking-wide text-gray-100 transition-all duration-200 hover:scale-150 hover:text-blue-300 active:scale-95"
                  >
                    {nav.name}
                  </CustomLink>
                </li>
              ))}
        </ul>
        <ul className=" items-center hidden space-x-2 lg:flex">
          <li>
            {user ? (
              user.photoURL ? (
                <img
                  src={user.photoURL}
                  className="w-8 rounded-2xl mr-1"
                  alt=""
                />
              ) : (
                <div className=" rounded-full mr-1 bg-sky-600 font-sans py-2 px-4 text-center text-white">
                  {user?.displayName?.slice(0, 1)}
                </div>
              )
            ) : (
              ""
            )}
          </li>
          <li>
            <p className="text-xl font-medium text-slate-200 font-serif tracking-wide mr-2">
              {user ? user.displayName : ""}
            </p>
          </li>
          <li>
            {user ? (
              <button
                data-mdb-ripple="true"
                data-mdb-ripple-color="white"
                onClick={handleSignOut}
                type="button"
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-700 hover:bg-gray-600 focus:shadow-outline focus:outline-none active:scale-90"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="white"
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-600 hover:bg-gray-600 focus:shadow-outline focus:outline-none active:scale-90"
              >
                {" "}
                Log In
              </button>
            )}
          </li>
        </ul>
        <div className="lg:hidden">
          <button
            data-mdb-ripple="true"
            data-mdb-ripple-color="white"
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full">
              <div className="p-5 bg-realBlack rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Link to="/" className="inline-flex items-center">
                      <img src={logo} alt="" className="w-16 rounded-md" />
                      <span className="italic ml-2 text-xl font-bold tracking-widest text-slate-100 uppercase">
                        Nextron!
                      </span>
                    </Link>
                  </div>
                  <div>
                    <button
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="white"
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline "
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-6 text-gray-100" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-4">
                    {user
                      ? userNavLinks.map((nav) => (
                          <li key={nav.id}>
                            <CustomLink
                              to={nav.to}
                              aria-label={nav.name}
                              title={nav.name}
                              className="font-medium tracking-wide text-gray-100 transition-colors duration-200"
                            >
                              {nav.name}
                            </CustomLink>
                          </li>
                        ))
                      : navLinks.map((nav) => (
                          <li key={nav.id}>
                            <CustomLink
                              to={nav.to}
                              aria-label={nav.name}
                              title={nav.name}
                              className="font-medium tracking-wide text-gray-100 transition-colors duration-200"
                            >
                              {nav.name}
                            </CustomLink>
                          </li>
                        ))}

                    <li className="">
                      {user ? (
                        user.photoURL ? (
                          <img
                            src={user.photoURL}
                            className="w-8 rounded-2xl mr-1 ml-8 mb-4 my-4"
                            alt=""
                          />
                        ) : (
                          <div className="w-8 rounded-2xl mr-1 py-1 px-2 bg-gray-600 text-center text-white my-4">
                            {user.displayName.slice(0, 1)}
                          </div>
                        )
                      ) : (
                        ""
                      )}
                      <p className="text-xl font-medium mr-2 text-white tracking-wider">
                        {" "}
                        {user ? user.displayName : ""}
                      </p>
                    </li>
                    <li>
                      {user ? (
                        <button
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="white"
                          onClick={handleSignOut}
                          className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-600 hover:bg-gray-500 focus:shadow-outline focus:outline-none"
                        >
                          Log Out
                        </button>
                      ) : (
                        <Link
                          to={"/login"}
                          className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-gray-600 hover:bg-gray-500 focus:shadow-outline focus:outline-none"
                        >
                          Log in
                        </Link>
                      )}
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

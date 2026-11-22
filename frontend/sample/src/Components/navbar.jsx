
import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
    return (


        <nav className="sticky top-0 z-50 w-full w-full bg-black shadow-md px-8 py-4 flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-blue-600">
                <img src="TracePulse Cloud Heartbeat Logo.png"
                className="w-18 h-14 object-contain"></img>

                 
            </Link>

            {/* Navigation Links */}
          

               
            

            {/* Login / Signup */}
            <div className="flex items-center gap-5 m-4">
                <Link
                    to="/login"
                    className="text-white rounded-lg hover:bg-blue-700"
                >
                    Login
                </Link>

                <Link
                    to="/signup"
                    className=" text-white px-5 py-5  rounded-lg hover:bg-blue-700"
                >
                    Sign Up
                </Link>
            </div>

        </nav>
    );
};

export default Navbar;

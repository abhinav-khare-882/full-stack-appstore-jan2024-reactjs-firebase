import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../../assets";
import UserProfile from "../UserProfileComponent";




const AdminHeader = () => {
  

  return (
    <div className="w-full flex items-center justify-between">
      {/* logo */}
      <Link to={"/"}>
        <img src={Logo} className="w-16 h-auto object-contain" alt=" " />
      </Link>
      {/* user profile section */}
      <UserProfile/>
    </div>
  );
};

export default AdminHeader;

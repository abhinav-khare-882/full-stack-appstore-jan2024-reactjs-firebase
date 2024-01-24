import React, { useState } from "react";
import { Rewards } from "../assets";
import UserProfile from "./UserProfileComponent";

const Header = () => {
  const [SearchTerm, setSearchTerm] = useState("");
  return (
    <div className="w-full flex items-center justify-between bg-third pl-6">
      <img src={Rewards} className="w-64 hidden lg:block h-auto object-cover" alt="" />

      {/* search here option */}
      <div className="flex items-center justify-center bg-[#282828] rounded-full shadow-lg px-4 py-3">
        <input
          type="text"
          placeholder="Search for Apps"
          value={SearchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent outline-none border-none text-base font-medium text-textSecondory placeholder:text-textPrimary tracking-wider lg:w-64 2xl:w-96"
        />
      </div>

      {/* profile section */}
      <UserProfile />
    </div>
  );
};

export default Header;

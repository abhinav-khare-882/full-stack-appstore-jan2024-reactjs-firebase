//UserProfileContainer
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar1 } from "../assets";
import { FaRupeeSign, FaChevronDown } from "react-icons/fa";
import { Menus, signOutTheUser } from "../utils/helper";
import { useQueryClient } from "react-query";
import { AnimatePresence, motion } from "framer-motion";
import { dropDownMenu } from "../animation";
import useUser from "../hooks/user/useUser";
import { HashLoader } from "react-spinners";

const UserProfile = () => {
  const { data: user, isLoading: userLoading, isError, refetch } = useUser();
  const [isHover, setIsHover] = useState(false);
  const queryClient = useQueryClient();
  if (userLoading) {
    return <HashLoader color="#FF9E01" size={60} />;
  }

  return (
    <div className="flex items-center justify-center gap-4 cursor-pointer relative">
      {/* name content */}
      <div className="flex flex-col items-start justify-start gap-1">
        <h2 className="text-lg font-bold text-textPrimary capitalize">{user?.name}</h2>
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-secondory border-2 border-gray-600">
            <FaRupeeSign className="text-sm text-heroSecondory" />
          </div>
          {user?.walletBalance ? (
            <React.Fragment >
              <p className="text-lg font-semibold text-heroPrimary">{user?.walletBalance}</p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p className="text-lg font-semibold text-heroPrimary">0</p>
            </React.Fragment>
          )}
        </div>
      </div>
      {/* image content */}
      <div
        className="w-16 h-16 rounded-full p-1 flex items-center justify-center relative bg-gradient-to-b from-heroPrimary to bg-heroSecondary"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <img
          src={user?.picture ? user?.picture : Avatar1}
          className="w-full h-full object-cover rounded-full"
          alt=""
        />
        <div className="w-4 h-4 rounded-full bg-secondary absolute bottom-1 right-0 flex items-center justify-center border border-gray-600">
          <FaChevronDown className="text-[10px] text-text-secondary" />
        </div>
      </div>
      {/* drop down section */}
      <AnimatePresence>
        {isHover && (
          <motion.div
            {...dropDownMenu}
            className="absolute top-20 right-0 bg-secondary shadow-md flex flex-col items-start justify-start w-64 px-3 py-2 gap-4 rounded-md z-50"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {Menus &&
              Menus.map((menu) => (
                <React.Fragment>
                  {!menu.isAdmin ? (
                    <Link
                      to={menu.uri}
                      key={menu.id}
                      className="py-2 px-1 font-semibold hover:text-heroSecondary"
                    >
                      {menu.menu}
                    </Link>
                  ) : (
                    <Link
                      to={menu.uri}
                      key={menu.id}
                      className="py-2 px-1 font-semibold hover:text-heroSecondary"
                    >
                      {menu.menu}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            <button
              type="button"
              onClick={() => signOutTheUser(queryClient)}
              className="px-4 py-2 w-full rounded-md bg-textPrimary text-primary active:scale-transition-all ease-in-out duration-158"
            >
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;

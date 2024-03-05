import React from 'react';
import {
  HiOutlineHome,
  HiOutlineUserCircle,
  HiOutlineTag,
} from 'react-icons/hi2';
import { LuMessagesSquare } from 'react-icons/lu';

import { GiThreeFriends } from 'react-icons/gi';

const LeftSidebar = () => {
  return (
    <div className="w-2/3 md:block md:w-full md:col-span-1 bg-white fixed md:sticky top-20 pt-5 h-[85vh] rounded-md border">
      <div className="flex">
        <div className="flex flex-col items-start gap-4 w-full p-5 *:cursor-pointer">
          <a className="flex items-center gap-2 text-lg font-medium hover:text-red-400">
            <HiOutlineHome className="text-xl" />
            <p>home</p>
          </a>
          <a className="flex items-center gap-2 text-lg font-medium hover:text-red-400">
            <HiOutlineUserCircle className="text-xl" />
            <p>profile</p>
          </a>
          <a className="flex items-center gap-2 text-lg font-medium hover:text-red-400">
            <GiThreeFriends className="text-xl" />
            <p>Comrades</p>
          </a>
          <a className="flex items-center gap-2 text-lg font-medium hover:text-red-400">
            <HiOutlineTag className="text-xl" />
            <p>following</p>
          </a>
          <a className="flex items-center gap-2 text-lg font-medium hover:text-red-400">
            <LuMessagesSquare className="text-xl" />
            <p>Messages</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;

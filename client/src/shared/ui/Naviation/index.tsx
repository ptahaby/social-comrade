import React, { useState, useRef, useEffect } from 'react';
import Dropdown from './Dropdown';
import Search from './Search';

const Navigation = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownElRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleOnClick = (e: MouseEvent) => {
      if (
        dropdownElRef.current &&
        !dropdownElRef.current.contains(e.target as HTMLElement)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleOnClick);
    return () => {
      document.removeEventListener('click', handleOnClick);
    };
  }, []);

  return (
    <header className="container mx-auto h-12 flex items-center">
      <div className="w-10/12 flex  mx-auto justify-between">
        <div className="flex">
          <div className=" mr-4">
            <img className=" w-48 h-10" src="/comrade_basic.png" />
          </div>
          <Search />
        </div>
        <nav className="">
          <ul
            className="flex justify-between *:rounded-full *:border
           *:border-sky-100 *:bg-red-50 *:px-2 *:py-0.5 dark:text-red-300
            dark:*:border-red-500/15 dark:*:bg-red-500/10 *:px-4 gap-4"
          >
            <li>Home</li>
            <li>Media</li>
            <li>Friends</li>
            <li>Groups</li>
          </ul>
        </nav>
        <div className="flex justify-end relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(!showDropdown);
            }}
          >
            <img className="h-8 w-8" src="/user-profile.png" />
          </button>
          <Dropdown ref={dropdownElRef} isShow={showDropdown} />
        </div>
      </div>
    </header>
  );
};

export default Navigation;

import React, { useState, useEffect, useCallback } from 'react';
import { MdClear } from 'react-icons/md';

const debounce = (fn: (data: string) => void, delay: number) => {
  let time: NodeJS.Timeout;
  return (data: string) => {
    clearTimeout(time);
    time = setTimeout(() => {
      clearTimeout(time);
      fn(data);
    }, delay);
  };
};

const Search = () => {
  const [value, setValue] = useState('');

  const handleOnChange = useCallback(
    debounce((data) => {
      console.log(data);
    }, 500),
    [],
  );

  useEffect(() => {
    if (!value) return;
    handleOnChange(value);
  }, [value]);

  return (
    <div>
      <div className=" relative">
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder="search"
          className=" h-10 py-1 bg-white border w-full rounded-full 
        text-sm shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-500 transition duration-300 pl-3 pr-10"
        />
        <button
          onClick={() => {
            setValue('');
          }}
          className="absolute top-0 right-0 h-full w-10 flex items-center rounded-full justify-center text-gray-400 hover:text-gray-600"
        >
          <MdClear />
        </button>
      </div>
    </div>
  );
};

export default Search;

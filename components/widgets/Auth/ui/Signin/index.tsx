import React, { useState, useEffect, useLayoutEffect } from 'react';
import router from 'next/router';
import useSwrMutation from 'swr/mutation';
import { userLogin } from '../../../../entities/user/user.api';
// import useThrottle from '@/shared/hooks/useThrottle';
import Child from './Child';
const SignIn = () => {
  const [input, setInput] = useState('');
  // const throttledValue = useThrottle(input);
  const { trigger } = useSwrMutation('auth/signin', userLogin, {
    onSuccess() {
      router.push('/home');
    },
  });
  useLayoutEffect(() => {
    console.log('Parent layout');
    return () => {
      console.log('return Parent  Layout');
    };
  });
  useEffect(() => {
    console.log('Parent  effect');
    return () => {
      console.log('return Parent  effect');
    };
  });
  console.log('Parent');
  const onSubmit = (data: FormData) => {
    const value = Object.fromEntries(data.entries());

    trigger(value as { email: string; password: string });
  };
  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            onSubmit(data);
          }}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setInput(e.target.value)}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-gray-500 hover:text-gray-400"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gray-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a
            href="#"
            className="font-semibold leading-6 text-gray-500 hover:text-gray-400"
          >
            Start a 14 day free trial
          </a>
        </p>
      </div>
      <Child input={input} />
    </>
  );
};

export default SignIn;

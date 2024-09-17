import React, { ReactNode, useState } from 'react';
import { Signin } from '../widgets/Auth';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const Comp = dynamic(() => import('../widgets/Auth').then((mod) => mod.Signup));
const tabs = {
  signin: <Signin />,
  signup: <Comp />,
};

export default function Page() {
  const [tab, setTab] = useState<keyof typeof tabs>('signin');

  return (
    <Suspense>
      {/*
      This example requires updating your template:

      ```
      <html class="h-full bg-white">
      <body class="h-full">
      ```
    */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-24 w-auto"
            src="/comrade_basic.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ddfdf dfdfdfdf dfdfdfdf dfdfdfdf">
            {`${tab === 'signin' ? 'Sign in to your account' : 'Sign up to your account'}`}
          </h2>
        </div>
        <div className="flex justify-center mt-2 *:cursor-pointer">
          <div
            onClick={() => setTab('signin')}
            className={`${tab === 'signin' ? 'border-b-2 border-red-900 text-red-900' : 'border-b'} px-5 `}
          >
            Signin
          </div>
          <div
            onClick={() => setTab('signup')}
            className={`${tab === 'signup' ? 'border-b-2 border-red-900 text-red-900' : 'border-b'} px-5`}
          >
            SignUp
          </div>
        </div>
        {tabs[tab] as ReactNode}
      </div>
    </Suspense>
  );
}

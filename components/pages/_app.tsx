import React from 'react';
import type { AppProps } from 'next/app';
import '../index.css';
import { NextPage } from 'next';

type NextPageLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

type Props = AppProps & {
  Component: NextPageLayout;
};
export default function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}

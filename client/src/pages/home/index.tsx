import React from 'react';
import Layout from '../../shared/ui/Layout';

const Home = () => {
  return <div></div>;
};

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
export default Home;

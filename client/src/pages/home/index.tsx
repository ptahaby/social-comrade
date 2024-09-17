import React, { useEffect } from 'react';
import Layout from '../../shared/ui/Layout';
import useSWR from 'swr';
import { getUser } from '../../entities/user';
import { useUserStore } from '@/entities/user';

const Home = () => {
  const { data } = useSWR('user', getUser);
  const { add } = useUserStore((state) => state);

  useEffect(() => {
    if (data) {
      add({ user: data.data });
    }
  }, [data]);

  return <div></div>;
};

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
export default Home;

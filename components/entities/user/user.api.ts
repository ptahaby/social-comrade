import axios from '../../shared/api/axios';

export const userLogin = async (
  url: string,
  { arg }: { arg: { email: string; password: string } },
) => {
  return axios.post(url, arg);
};

export const userSignUp = async (
  url: string,
  { arg }: { arg: { email: string; password: string } },
) => {
  return axios.post(url, arg);
};

export const userLogout = async () => {
  return axios.get('auth/logout');
};

export const getUser = async (url: string) => {
  return axios.get(url);
};

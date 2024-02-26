import axios from '../../shared/api/axios';

export const userLogin = async (
  url: string,
  { arg }: { arg: { email: string; password: string } },
) => {
  return axios.post(url, arg);
};

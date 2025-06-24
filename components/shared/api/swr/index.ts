import axios from '../axios';

const fetcher = async (url: string) => {
  return await axios.get(url);
};

export default fetcher;

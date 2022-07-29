import axios from "axios";
const URL = "http://www.mocky.io/v2/5df38f523100006d00b58560";
export const createPost = async (requestData) => {
  const { data } = await axios.post(URL, requestData);
  if (!data) throw new Error("No data");
  return data;
};

import axios from "axios";

const API = axios.create({
  baseURL: "https://shop-easy-snowy-seven.vercel.app/api",
});

export default API;
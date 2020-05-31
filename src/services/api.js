import axios from "axios";

const api = axios.create({
  baseURL: "https://app-e-facil.herokuapp.com/",
});

console.log(process.env);
export default api;

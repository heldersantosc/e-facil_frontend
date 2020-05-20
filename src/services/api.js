import axios from "axios";

const api = axios.create({
  baseURL: "https://app-e-facil.herokuapp.com/",
});

export default api;

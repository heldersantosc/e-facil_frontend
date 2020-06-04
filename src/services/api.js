import axios from "axios";

let api = "";

if (process.env.NODE_ENV === "development") {
  api = axios.create({
    baseURL: "http://192.168.0.118:5000/",
  });
} else if (process.env.NODE_ENV === "production") {
  api = axios.create({
    baseURL: "https://app-e-facil.herokuapp.com/",
  });
}
export default api;

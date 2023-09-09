import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://user-api.dev.grailfarmer.app/api/v1",

  headers: { "Content-Type": "application/json" },

  withCredentials: true,
});

export default newRequest;

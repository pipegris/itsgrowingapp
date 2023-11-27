import axios from "axios";
export default axios.create({
  baseURL: "http://34.135.199.43:3001",
  headers: {
    "Content-type": "application/json"
  }
});

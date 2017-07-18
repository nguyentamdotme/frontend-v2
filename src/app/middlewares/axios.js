import axios from 'axios';

export default (token) => {
  return axios.create({
      baseURL: "http://localhost:3000/api/v1",
      timeout: 1000,
      responseType:"json",
      headers: {
        "content-type"  : "application/json",
        "Authorization" : token,
      }
    });
}

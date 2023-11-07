//import axios
import axios from "axios";

//creating a function comman api request
export const commanRequest = async (method, url, body) => {
  //request configuration :::::::::object

  let reqConfig = {
    //methode means get ,put,post,delete
    method,
    url,
    //http://localhost:4000
    data: body,
    headers: {
      "Content-type": "application/json",
    },
  };

  //create axios instance
  return axios(reqConfig)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

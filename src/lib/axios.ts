import axios from "axios";


export const sendApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-type": "application/json"
      }
  });

  export const sendFileApi = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "multipart/form-data",
        
      }
  });




import axios from "axios";

const baseURL = "http://localhost:8082/api/aws"
export const customAxios = axios.create(
    {
        baseURL: baseURL
    }
)


   
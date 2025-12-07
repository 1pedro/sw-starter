
import axios, { CreateAxiosDefaults } from "axios";
export const api = (apiUrl: string) => {
    const headers: CreateAxiosDefaults["headers"] = {
        "content-type": "application/json",
    };

    const axiosInstance = axios.create({
        baseURL: apiUrl,
        headers,
    });

    return axiosInstance;
};

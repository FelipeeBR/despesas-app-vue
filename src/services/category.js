import axios from "axios";

const token = localStorage.getItem("token");
const api = axios.create({
    baseURL: "http://localhost:8888/api", 
});

export function getCategories() {
    return axios.get(`${api.defaults.baseURL}/category`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
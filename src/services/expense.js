import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
    baseURL: "http://localhost:8888/api", 
});

export async function createExpense(data) {
    return axios.post(`${api.defaults.baseURL}/expense`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export async function getExpenses() {
    return axios.get(`${api.defaults.baseURL}/expense`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
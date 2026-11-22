import axios from "axios";

const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
          withCredentials: true
});

export const deleteMonitor = async (id) => {
    const response = await api.delete(`/api/${id}`);
    return response.data;
};

export const getMonitorHistory = async (apiId) => {
    const response = await api.get( 
        `/api/analytics/response-time/${apiId}`
    );

    return response.data;
};


export const logoutUser = async () => {
    const response = await api.post("/user/logout");
    return response.data;
};
export default api;

import axios from "axios";

export const API_DOMAIN =
	import.meta.env.VITE_API_ENDPOINT || "http://localhost:5173";

if (!API_DOMAIN) {
	throw new Error("API_DOMAIN is not defined in the environment variables.");
}

const api = axios.create({
	baseURL: `${API_DOMAIN}/`,
});

export default api;

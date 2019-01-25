import axios from "axios";

const PRODUCTION = "http://murugappan.pythonanywhere.com/";
const PATH = "api/v1/seller/";
const BASE_URL = PRODUCTION + PATH;
export const BaseAxiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 600000,
	headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" },
});

export const setGlobalHeader = (token: string, userId: number) => {
	BaseAxiosInstance.defaults.headers.common["token"] = token;
	BaseAxiosInstance.defaults.headers.common["user-id"] = userId;
};

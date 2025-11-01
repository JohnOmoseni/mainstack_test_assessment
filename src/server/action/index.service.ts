import api from "@/server/axios";
import { handleApiError } from "@/lib/utils";
import { type AxiosResponse } from "axios";

const getUserService = async (): Promise<AxiosResponse["data"]> => {
	try {
		const { data } = await api.get(`/user`);
		return data;
	} catch (error) {
		throw handleApiError(error);
	}
};

const getWalletService = async (): Promise<AxiosResponse["data"]> => {
	try {
		const { data } = await api.get(`/wallet`);
		return data;
	} catch (error) {
		throw handleApiError(error);
	}
};

const getTransactionListService = async (): Promise<AxiosResponse["data"]> => {
	try {
		const { data } = await api.get(`/transactions`);
		return data;
	} catch (error) {
		throw handleApiError(error);
	}
};

export const apiService = {
	getUserService,
	getWalletService,
	getTransactionListService,
};

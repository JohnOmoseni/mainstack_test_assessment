import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { apiService } from "./index.service";

export const useGetUserProfileService = (
	options?: Omit<UseQueryOptions, "queryKey" | "queryFn" | "select">
) => {
	return useQuery({
		...options,
		queryKey: ["user_profile"],
		queryFn: () => apiService.getUserService(),
		select: (data: any) => data as UserResponse,
	});
};

export const useGetWalletService = () =>
	useQuery({
		queryKey: ["user_wallet"],
		queryFn: () => apiService.getWalletService(),
		select: (data) => data as WalletResponse,
	});

export const useGetTransactionListService = () =>
	useQuery({
		queryKey: ["transactions"],
		queryFn: () => apiService.getTransactionListService(),
		select: (data) => data as TransactionDataResponse[],
	});

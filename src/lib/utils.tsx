import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { isAxiosError } from "axios";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type ToastType = "success" | "info" | "error" | "warning" | "loading";

export function showToast(
	type: ToastType,
	message: string,
	duration: number = 5000,
	desc?: string
) {
	toast[type](
		<div className="row-flex">
			<div className="flex-column w-full ovwerflow-hidden pl-1">
				<p className="font-semibold leading-5 wrap-break-word text-sm line-clamp-5">
					{message}
				</p>
				{desc && <p className="text-sm">{desc}</p>}
			</div>
		</div>,
		{
			className: `sonner-toast sonner-toast-${type}`,
			duration,
		}
	);
}

export const handleApiError = (
	error: unknown
): { message: string } | string => {
	if (isAxiosError(error)) {
		console.log("Axios error detected!", error.response);

		const response = error.response;

		if (response) {
			const { status, data } = response;

			switch (status) {
				case 400:
					return {
						message:
							data?.error?.message ||
							JSON.stringify(data?.error) || // Stringify generic error objects
							data?.message || // Handle simple error messages
							"Bad Request",
					};

				case 401:
					return { message: data?.message || "Unauthorized User!" };
				case 403:
					return { message: data?.message || "Forbidden" };
				case 404:
					return { message: data?.message || "Resource not found" };
				case 409:
					return { message: data?.message || "A duplicate already exists" };
				case 422:
					return { message: data?.message || "Validation error" };
				default:
					return data || "An unexpected error occurred";
			}
		}

		return error.message || "Network error or server did not respond";
	}

	if (error instanceof Error) {
		return error.message;
	}

	return "An unknown error occurred";
};

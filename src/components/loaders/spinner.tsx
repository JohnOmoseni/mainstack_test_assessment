"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Spinner = ({
	text,
	size = "sm",
	loaderClassname,
}: {
	text?: string;
	size?: "sm" | "md";
	loaderClassname?: string;
}) => {
	return (
		<div className="h-full flex flex-col justify-center items-center">
			{size === "md" ? (
				<div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
			) : (
				<Loader2 className={cn(loaderClassname, "w-4 h-4 animate-spin")} />
			)}
			{text && (
				<p className="mt-2 text-sm text-gray-500">{text || "loading"}...</p>
			)}
		</div>
	);
};

export default Spinner;

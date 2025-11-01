export const getStatusBadgeColor = (status: string) => {
	const green = ["active", "deposit"];
	const blue = ["in progress"];
	const yellow = ["pending"];
	const red = ["withdrawal"];

	const normalized = status.toLowerCase();

	if (green.includes(normalized)) {
		return "bg-green-100 text-green-800 border-green-400";
	}
	if (blue.includes(normalized)) {
		return "bg-blue-100 text-blue-800 border-blue-400";
	}
	if (yellow.includes(normalized)) {
		return "bg-yellow-100 text-yellow-800 border-yellow-400";
	}
	if (red.includes(normalized)) {
		return "bg-red-100 text-red-800 border-red-400";
	}

	// fallback
	return "bg-gray-100 text-gray-800 border-gray-400";
};

import type { ColumnDef } from "@tanstack/react-table";
import { showToast } from "./utils";

export function exportTableToCSV<T extends object>(
	data: T[],
	columns: { header: string; accessorKey: keyof T }[],
	filename = "export.csv"
) {
	if (!data || data.length === 0 || !columns || columns.length === 0) {
		console.warn("No data to export");
		showToast("info", "No data to export");
		return;
	}

	const headers = columns.map((col) => col.header);

	const rows = data.map((row) =>
		columns.map((col) => {
			const value = row[col.accessorKey];
			// Escape quotes and commas
			return `"${
				value !== undefined && value !== null
					? String(value).replace(/"/g, '""')
					: ""
			}"`;
		})
	);

	const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");

	const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.setAttribute("download", filename);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

type ExportableColumn<T> = {
	header: string;
	accessorKey: Extract<keyof T, string | number>;
};

export function getExportableColumns<T>(
	columns: ColumnDef<T, any>[]
): ExportableColumn<T>[] {
	return columns
		.filter(
			(col): col is ColumnDef<T> & { accessorKey: keyof T } =>
				!!(col as any).accessorKey
		)
		.map((col) => ({
			header: col.header as string,
			accessorKey: (col as any).accessorKey,
		}));
}

export const formatAmount = (value: number): string => {
	const numberPrice = Number(value);
	if (isNaN(numberPrice)) {
		return "0";
	}

	const formatter = new Intl.NumberFormat("en", {
		notation: "compact",
		compactDisplay: "short",

		currencyDisplay: "symbol",
		currency: "NGN",
		useGrouping: true,

		maximumFractionDigits: 2,
	});

	return formatter.format(value);
};

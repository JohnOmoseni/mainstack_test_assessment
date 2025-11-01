import { formatAmount } from "@/lib";
import { getStatusBadgeColor } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const TRANSACTION_COLUMNS: ColumnDef<TransactionDataResponse>[] = [
	{
		header: "Product Name",
		accessorFn: (row) => row.metadata?.product_name || "No Name",
		cell: ({ row }) => {
			const transaction = row.original;
			const metadata = transaction.metadata;

			return (
				<div className="flex-row-btwn gap-6">
					<div
						className={cn(
							"size-12 flex-row-center rounded-full bg-gray-100",
							getStatusBadgeColor(transaction.type?.toLowerCase())
						)}
					>
						{transaction.type === "deposit" ? (
							<ArrowDownLeft className="h-5 w-5 text-green-600" />
						) : transaction.type === "withdrawal" ? (
							<ArrowUpRight className="h-5 w-5 text-orange-600" />
						) : (
							<ArrowUpRight className="h-5 w-5 text-gray-600" />
						)}
					</div>
					<div className="flex flex-1 flex-col ">
						<p className="font-medium text-lg">
							{metadata?.product_name || "No Name"}
						</p>
						<p className="text-sm">{metadata?.name || "unknown"}</p>
					</div>
				</div>
			);
		},
	},
	{
		header: "Amount",
		accessorKey: "amount",
		size: 100,
		cell: ({ row }) => {
			const transaction = row.original;
			const amount = transaction.amount ? formatAmount(transaction.amount) : 0;
			const date = transaction?.date
				? format(new Date(transaction.date), "MMM d, yyyy")
				: "";

			return (
				<div className="flex flex-col items-end *:text-end gap-1">
					<h3 className="font-medium">USD {amount}</h3>
					<p className="text-sm">{date}</p>
				</div>
			);
		},
	},
];

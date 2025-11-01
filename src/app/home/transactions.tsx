import DataTable from "@/components/table/data-table";
import { useMemo } from "react";
import { useGetTransactionListService } from "@/server/action/useServerActions";
import { TRANSACTION_COLUMNS } from "@/components/table/columns/transaction-column";
import { ChevronDown, Download, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportTableToCSV, getExportableColumns } from "@/lib";
import { isWithinInterval, parseISO } from "date-fns";
import { parseAsString, useQueryStates } from "nuqs";
import FilterModal from "@/components/modals/filter_modal";

const Transactions = () => {
	const [filters, setFilters] = useQueryStates({
		date_range: parseAsString,
		transaction_type: parseAsString,
		transaction_status: parseAsString,
	});
	const { data: transactions, isLoading: isFetchingTransactions } =
		useGetTransactionListService();

	const activeFiltersCount = useMemo(() => {
		let count = 0;
		if (filters?.date_range) count += 1;
		if (filters?.transaction_type)
			count += filters?.transaction_type.split(",").filter(Boolean).length;
		if (filters?.transaction_status)
			count += filters?.transaction_status.split(",").filter(Boolean).length;
		return count;
	}, [filters]);

	const filteredTransactions = useMemo(() => {
		if (!transactions) return [];

		let filtered = [...transactions];

		// Filter by date range
		if (filters.date_range) {
			const [start, end] = filters.date_range.split("_");
			if (start && end) {
				const startDate = parseISO(start);
				const endDate = parseISO(end);
				filtered = filtered.filter((tx) => {
					if (!tx.date) return false;
					const txDate = parseISO(tx.date);
					return isWithinInterval(txDate, { start: startDate, end: endDate });
				});
			}
		}

		// Filter by transaction type
		if (filters.transaction_type) {
			const selectedTypes = filters.transaction_type
				.split(",")
				.map((v) => v.trim().toLowerCase());
			filtered = filtered.filter((tx) =>
				selectedTypes.includes(tx.type?.toLowerCase())
			);
		}

		if (filters.transaction_status) {
			const selectedStatuses = filters.transaction_status
				.split(",")
				.map((v) => v.trim().toLowerCase());
			filtered = filtered.filter((tx) =>
				selectedStatuses.includes(tx.status?.toLowerCase())
			);
		}

		return filtered;
	}, [transactions, filters]);

	const tableData = useMemo(
		() => filteredTransactions || [],
		[filteredTransactions]
	);
	const columnHeadersToExport = getExportableColumns(TRANSACTION_COLUMNS);
	const handleExport = () => {
		if (!filteredTransactions.length) return;
		exportTableToCSV(
			filteredTransactions,
			columnHeadersToExport,
			`transactions-${new Date().toISOString().split("T")[0]}.csv`
		);
	};

	const clearFilters = () => {
		setFilters(null);
	};

	return (
		<>
			<div className="flex-col flex gap-6">
				<div className="flex-wrap flex-row-btwn gap-6 pb-6 border-b border-gray-100">
					<div>
						<h2 className="text-2xl">
							{filteredTransactions && filteredTransactions.length > 0
								? `${filteredTransactions.length} ${
										filteredTransactions.length > 1
											? "Transactions"
											: "Transaction"
								  }`
								: "No Transactions"}{" "}
						</h2>
						<p className="text-sm">Your transactions for the last 7 days</p>
					</div>

					<div className="flex gap-3">
						<FilterModal
							trigger={
								<Button
									variant={"outline"}
									className="bg-gray-100 border-none hover:bg-gray-200 min-w-[100px]"
								>
									Filter
									{activeFiltersCount > 0 && (
										<div className="size-6 mx-0.5 flex-row-center bg-gray-900 rounded-full">
											<span className="text-white block text-sm -mt-px!">
												{activeFiltersCount}
											</span>
										</div>
									)}
									<ChevronDown className="h-4 w-4" />
								</Button>
							}
						/>
						<Button
							variant={"outline"}
							onClick={handleExport}
							className="bg-gray-100 border-none hover:bg-gray-200"
						>
							Export list
							<Download className="size-4" />
						</Button>
					</div>
				</div>

				<DataTable
					columns={TRANSACTION_COLUMNS}
					tableData={tableData}
					hideTableHeader={true}
					isLoading={isFetchingTransactions}
					emptyState={
						<div className="flex-column-center gap-2">
							<Button
								variant={"outline"}
								className="bg-gray-100 rounded-lg min-w-max border-none hover:bg-gray-200 p-3"
							>
								<Receipt />
							</Button>
							<h3 className="text-xl mt-2">No transactions found</h3>

							<p className="font-light text-center">
								Change your filters to see more results, or add a new product.
							</p>

							<Button
								variant={"outline"}
								onClick={clearFilters}
								className="bg-gray-100 border-none hover:bg-gray-200 mt-6"
							>
								Clear Filter
							</Button>
						</div>
					}
				/>
			</div>
		</>
	);
};

export default Transactions;

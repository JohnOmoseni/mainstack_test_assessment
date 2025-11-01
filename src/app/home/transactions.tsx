import DataTable from "@/components/table/data-table";
import { useMemo } from "react";
import { useGetTransactionListService } from "@/server/action/useServerActions";
import { TRANSACTION_COLUMNS } from "@/components/table/columns/transaction-column";
import { ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportTableToCSV, getExportableColumns } from "@/lib";
import FilterModal from "@/components/modals/filter_modal";

const Transactions = () => {
	const { data: transactions, isLoading: isFetchingTransactions } =
		useGetTransactionListService();
	const tableData = useMemo(() => transactions || [], [transactions]);

	const columnHeadersToExport = getExportableColumns(TRANSACTION_COLUMNS);
	const handleExport = () => {
		if (!transactions) return;
		exportTableToCSV(
			transactions,
			columnHeadersToExport,
			`transactions-${new Date().toISOString().split("T")[0]}.csv`
		);
	};

	return (
		<>
			<div className="flex-col flex gap-6">
				<div className="flex-wrap flex-row-btwn gap-6 pb-6 border-b border-gray-100">
					<div>
						<h2 className="text-2xl">24 Transactions</h2>
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
				/>
			</div>
		</>
	);
};

export default Transactions;

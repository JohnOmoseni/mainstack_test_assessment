import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getFilteredRowModel,
	getSortedRowModel,
	type ColumnSort,
	type ColumnFiltersState,
	getPaginationRowModel,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { type ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SortAsc, SortAscIcon, SortDesc } from "lucide-react";
import Spinner from "../loaders/spinner";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	tableData: TData[];
	columnFilters?: ColumnFiltersState;
	globalFilter?: any;
	hideTableHeader?: boolean;
	emptyState?: ReactNode;
	isLoading?: boolean;
	containerStyles?: string;
}

export default function DataTable<TData, TValue>({
	columns,
	tableData,
	columnFilters,
	globalFilter,
	hideTableHeader,
	emptyState,
	isLoading,
	containerStyles,
}: DataTableProps<TData, TValue>) {
	const [data, setData] = useState(tableData);
	const [sorting, setSorting] = useState<ColumnSort[]>([]);
	const [rowSelection, setRowSelection] = useState<{ [key: string]: boolean }>(
		{}
	);

	useEffect(() => {
		setData(tableData);
	}, [tableData]);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnFilters,
			globalFilter,
			rowSelection,
		},
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		onRowSelectionChange: setRowSelection,
	});

	return (
		<div className="flex-column">
			<div className="data-table">
				<Table className="scroll-thin overflow-x-auto">
					{!hideTableHeader && (
						<TableHeader className="">
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow
									key={headerGroup.id}
									className={cn("bg-[#F9FAFB]", containerStyles)}
								>
									{headerGroup.headers.map((header) => {
										const sortStatus = header.column.getIsSorted();
										const sortIcons = {
											asc: <SortAsc className="size-4 mt-px" />,
											desc: <SortDesc className="size-4 mt-px" />,
											sort: <SortAscIcon className="size-4 mt-px" />,
										};
										const sortIcon = sortStatus
											? sortIcons[sortStatus]
											: sortIcons["sort"];

										return (
											<TableHead key={header.id}>
												{header.isPlaceholder ? null : (
													<div
														className="row-flex-btwn gap-4 relative cursor-default font-semibold text-foreground-100"
														onClick={header.column.getToggleSortingHandler()}
													>
														{flexRender(
															header.column.columnDef.header,
															header.getContext()
														)}
														{header.column.getCanSort() && sortIcon}
													</div>
												)}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
					)}

					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="relative h-[300px]"
								>
									<Spinner />
								</TableCell>
							</TableRow>
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									className="shad-table-row border-b border-gray-50/80"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="text-foreground py-4">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-[220px] lg:h-[250px] font-medium"
								>
									{emptyState || "No results."}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

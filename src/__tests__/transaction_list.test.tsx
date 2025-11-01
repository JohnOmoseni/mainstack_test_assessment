// __tests__/Transactions.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { useGetTransactionListService } from "@/server/action/useServerActions";
import { exportTableToCSV } from "@/lib";
import Transactions from "@/app/home/transactions";

jest.mock("@/server/action/useServerActions");
jest.mock("@/lib", () => ({
	exportTableToCSV: jest.fn(),
	getExportableColumns: jest.fn(() => []),
}));
jest.mock("nuqs", () => ({
	parseAsString: jest.fn(),
	useQueryStates: jest.fn(() => [
		{
			date_range: null,
			transaction_type: null,
			transaction_status: null,
		},
		jest.fn(),
	]),
}));

jest.mock("@/components/modals/filter_modal", () => ({
	__esModule: true,
	default: ({ trigger }: any) => (
		<div data-testid="filter-modal">{trigger}</div>
	),
}));

describe("Transactions Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders empty state when no transactions", () => {
		(useGetTransactionListService as jest.Mock).mockReturnValue({
			data: [],
			isLoading: false,
		});

		render(<Transactions />);

		expect(screen.getByText("No transactions found")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Change your filters to see more results, or add a new product."
			)
		).toBeInTheDocument();
	});

	it("renders list of transactions when data exists", () => {
		(useGetTransactionListService as jest.Mock).mockReturnValue({
			data: [
				{
					id: 1,
					type: "credit",
					status: "success",
					date: "2025-10-10T00:00:00Z",
				},
				{
					id: 2,
					type: "debit",
					status: "failed",
					date: "2025-10-12T00:00:00Z",
				},
			],
			isLoading: false,
		});

		render(<Transactions />);

		expect(screen.getByText("2 Transactions")).toBeInTheDocument();
		expect(screen.getByTestId("table")).toBeInTheDocument();
		expect(screen.getByText("1")).toBeInTheDocument();
		expect(screen.getByText("2")).toBeInTheDocument();
	});

	it("displays loading state when fetching transactions", () => {
		(useGetTransactionListService as jest.Mock).mockReturnValue({
			data: [],
			isLoading: true,
		});

		render(<Transactions />);
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("calls exportTableToCSV when Export button clicked", () => {
		(useGetTransactionListService as jest.Mock).mockReturnValue({
			data: [
				{
					id: 1,
					type: "credit",
					status: "success",
					date: "2025-10-10T00:00:00Z",
				},
			],
			isLoading: false,
		});

		render(<Transactions />);

		const exportBtn = screen.getByText("Export list");
		fireEvent.click(exportBtn);

		expect(exportTableToCSV).toHaveBeenCalled();
	});
});

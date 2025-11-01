// @ts-ignore
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BalanceStats } from "@/app/home/balance_stats";
import { useGetWalletService } from "@/server/action/useServerActions";

// 🧱 Mock the hook so tests don’t call backend
jest.mock("@/server/action/useServerActions", () => ({
	useGetWalletService: jest.fn(),
}));

describe("BalanceStats", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders skeleton loaders when loading", () => {
		(useGetWalletService as jest.Mock).mockReturnValue({
			data: null,
			isLoading: true,
		});

		render(<BalanceStats />);
		expect(screen.getAllByRole("status").length).toBeGreaterThan(0);
	});

	it("renders all balance statistics correctly", () => {
		(useGetWalletService as jest.Mock).mockReturnValue({
			data: {
				ledger_balance: "100.00",
				total_payout: "50.00",
				total_revenue: "200.00",
				pending_payout: "25.00",
			},
			isLoading: false,
		});

		render(<BalanceStats />);

		expect(screen.getByText("Ledger Balance")).toBeInTheDocument();
		expect(screen.getByText("Total Payout")).toBeInTheDocument();
		expect(screen.getByText("Total Revenue")).toBeInTheDocument();
		expect(screen.getByText("Pending Payout")).toBeInTheDocument();

		expect(screen.getByText("USD 100.00")).toBeInTheDocument();
		expect(screen.getByText("USD 50.00")).toBeInTheDocument();
		expect(screen.getByText("USD 200.00")).toBeInTheDocument();
		expect(screen.getByText("USD 25.00")).toBeInTheDocument();
	});

	it("renders info buttons with accessibility labels", () => {
		(useGetWalletService as jest.Mock).mockReturnValue({
			data: {},
			isLoading: false,
		});

		render(<BalanceStats />);

		expect(
			screen.getByLabelText("Info about Ledger Balance")
		).toBeInTheDocument();
		expect(
			screen.getByLabelText("Info about Total Payout")
		).toBeInTheDocument();
	});
});

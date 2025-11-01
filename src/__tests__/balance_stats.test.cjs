const { render, screen } = require("@testing-library/react");
require("@testing-library/jest-dom");
const { BalanceStats } = require("@/app/home/balance_stats");
const { useGetWalletService } = require("@/server/action/useServerActions");

jest.mock("@/server/action/useServerActions", () => ({
	useGetWalletService: jest.fn(),
}));

describe("BalanceStats", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders all balance statistics correctly", () => {
		useGetWalletService.mockReturnValue({
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
		useGetWalletService.mockReturnValue({
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

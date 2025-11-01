interface WalletResponse {
	balance: number;
	total_payout: number;
	total_revenue: number;
	pending_payout: number;
	ledger_balance: number;
}

interface UserResponse {
	first_name: string;
	last_name: string;
	email: string;
}

interface TransactionDataResponse {
	amount: number;
	metadata?: TransactionMetadata;
	payment_reference?: string;
	status: "successful" | "failed" | "pending" | string;
	type: "deposit" | "withdrawal" | string;
	date: string;
}

interface TransactionMetadata {
	name: string;
	type: string; // "digital_product", "webinar", etc.
	email: string;
	quantity: number;
	country: string;
	product_name?: string;
}

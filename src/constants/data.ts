export interface ChartDataPoint {
	date: string;
	value: number;
}

export const dummyChartData: ChartDataPoint[] = [
	{ date: "Apr 1, 2022", value: 45000 },
	{ date: "Apr 5, 2022", value: 62000 },
	{ date: "Apr 8, 2022", value: 78000 },
	{ date: "Apr 12, 2022", value: 95000 },
	{ date: "Apr 15, 2022", value: 88000 },
	{ date: "Apr 18, 2022", value: 105000 },
	{ date: "Apr 22, 2022", value: 92000 },
	{ date: "Apr 25, 2022", value: 78000 },
	{ date: "Apr 28, 2022", value: 65000 },
	{ date: "Apr 30, 2022", value: 52000 },
];

export const dummyTransactions = [
	{
		amount: 500,
		metadata: {
			name: "John Doe",
			type: "digital_product",
			email: "johndoe@example.com",
			quantity: 1,
			country: "Nigeria",
			product_name: "Rich Dad Poor Dad",
		},
		payment_reference: "c3f7123f-186f-4a45-b911-76736e9c5937",
		status: "successful",
		type: "deposit",
		date: "2022-03-03",
	},
	{
		amount: 400,
		metadata: {
			name: "Fibi Brown",
			type: "coffee",
			email: "fibibrown@example.com",
			quantity: 8,
			country: "Ireland",
		},
		payment_reference: "d28db158-0fc0-40cd-826a-4243923444f7",
		status: "successful",
		type: "deposit",
		date: "2022-03-02",
	},
	{
		amount: 350.56,
		metadata: {
			name: "Delvan Ludacris",
			type: "webinar",
			email: "johndoe@example.com",
			quantity: 1,
			country: "Kenya",
			product_name: "How to build an online brand",
		},
		payment_reference: "73f45bc0-8f41-4dfb-9cae-377a32b71d1e",
		status: "successful",
		type: "deposit",
		date: "2022-03-01",
	},
	{
		amount: 300,
		status: "successful",
		type: "withdrawal",
		date: "2022-03-01",
	},
	{
		amount: 300,
		metadata: {
			name: "Shawn kane",
			type: "webinar",
			email: "shawnkane@example.com",
			quantity: 1,
			country: "United Kingdom",
			product_name: "Support my outreach",
		},
		payment_reference: "c22055e5-8f47-4059-a1e9-51124d325992",
		status: "successful",
		type: "deposit",
		date: "2022-02-28",
	},
	{
		amount: 200,
		status: "successful",
		type: "withdrawal",
		date: "2022-03-01",
	},
	{
		amount: 200,
		metadata: {
			name: "Ada Eze",
			type: "webinar",
			email: "adaeze1@example.com",
			quantity: 1,
			country: "Nigeria",
			product_name: "Learn how to pitch your idea",
		},
		payment_reference: "5b2988d9-395e-4a91-984b-8b02f0d12df9",
		status: "successful",
		type: "deposit",
		date: "2022-02-20",
	},
];

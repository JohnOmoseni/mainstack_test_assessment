import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { dummyChartData } from "@/constants/data";
import { useGetWalletService } from "@/server/action/useServerActions";
import {
	LineChart,
	Line,
	XAxis,
	ResponsiveContainer,
	Tooltip,
	ReferenceLine,
} from "recharts";

const BalanceChart = () => {
	const { data: balance_data, isLoading } = useGetWalletService();

	if (isLoading) {
		return (
			<>
				<div className="flex flex-col gap-12">
					<div className="flex items-start justify-between  gap-8 max-w-[520px]">
						<div className="space-y-2">
							<Skeleton className="h-4 w-24 bg-gray-200" />
							<Skeleton className="h-6 w-32 bg-gray-200" />
						</div>
						<Skeleton className="in-w-[118px] sm:min-w-[160px] h-[52px] py-0 rounded-full bg-gray-200" />
					</div>
					<Skeleton className="w-full h-[320px] rounded-md bg-gray-200" />
				</div>
			</>
		);
	}

	return (
		<>
			<div className="flex-row-btwn gap-8 max-w-[520px]">
				<div>
					<p className="text-sm mb-2">Available Balance</p>
					<h1 className="">USD {balance_data?.balance || 0}</h1>
				</div>
				<Button className="min-w-[118px] sm:min-w-[160px] h-[52px] py-0">
					Withdraw
				</Button>
			</div>

			<div className="w-full h-[320px]">
				<ResponsiveContainer width="98%" height="100%" className={"ml-auto"}>
					<LineChart
						data={dummyChartData}
						margin={{
							top: 12,
							right: 10,
							left: 0,
							bottom: 0,
						}}
					>
						<ReferenceLine y={0} stroke="#E5E7EB" strokeWidth={1} />
						<XAxis
							dataKey="date"
							axisLine={false}
							tickLine={false}
							tick={{ fontSize: 14, fill: "#56616B", textAnchor: "inherit" }}
							padding={{ left: 0, right: 65 }}
							interval={0}
							ticks={[
								dummyChartData[0]?.date,
								dummyChartData[dummyChartData.length - 1]?.date,
							]}
							tickFormatter={(value) => {
								const parts = value.split(",");
								return `${parts[0]}, ${parts[1]}`;
							}}
						/>
						<Tooltip
							content={({ active, payload }) => {
								if (active && payload && payload.length) {
									return (
										<div className="bg-white py-2 px-3 rounded-lg shadow-lg border border-gray-100">
											<p className="text-sm font-medium">
												{payload[0].payload.date}
											</p>
											<p className="text-xs text-muted-foreground mt-1">
												USD{" "}
												<span className="font-semibold text-foreground">
													{payload[0].value?.toLocaleString()}
												</span>
											</p>
										</div>
									);
								}
								return null;
							}}
						/>
						<Line
							type="monotone"
							dataKey="value"
							stroke="#ff6b35"
							strokeWidth={2}
							dot={false}
							activeDot={{ r: 6, fill: "#ff6b35" }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</>
	);
};

export default BalanceChart;

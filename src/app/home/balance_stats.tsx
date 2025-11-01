"use client";

import { InfoIcon } from "lucide-react";
import { useState, useEffectEvent, useMemo } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetWalletService } from "@/server/action/useServerActions";
import { Skeleton } from "@/components/ui/skeleton";

export function BalanceStats() {
	const { data: balance_data, isLoading } = useGetWalletService();
	const [_hoveredStat, setHoveredStat] = useState<string | null>(null);

	const balanceStats = useMemo(() => {
		return [
			{
				label: "Ledger Balance",
				value: balance_data?.ledger_balance || "0.00",
				tooltip: "",
			},
			{
				label: "Total Payout",
				value: balance_data?.total_payout || "0.00",
				tooltip: "",
			},
			{
				label: "Total Revenue",
				value: balance_data?.total_revenue || "0.00",
				tooltip: "",
			},
			{
				label: "Pending Payout",
				value: balance_data?.pending_payout || "0.00",
				tooltip: "",
			},
		];
	}, [balance_data]);

	const handleInfoHover = useEffectEvent((label: string) => {
		setHoveredStat(label);
	});

	const handleInfoLeave = useEffectEvent(() => {
		setHoveredStat(null);
	});

	if (isLoading) {
		return (
			<div className="space-y-8 flex flex-col justify-between h-[95%]">
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className="flex items-start justify-between">
						<div className="space-y-2">
							<Skeleton className="h-4 w-24 bg-gray-200" />
							<Skeleton className="h-6 w-32 bg-gray-200" />
						</div>
						<Skeleton className="h-5 w-5 rounded-full bg-gray-200 mt-2" />
					</div>
				))}
			</div>
		);
	}

	return (
		<div className="space-y-8 flex flex-col justify-between h-[95%]">
			{balanceStats.map((stat) => (
				<div key={stat.label} className="flex items-start justify-between">
					<div className="space-y-0.5">
						<p className="text-sm text-gray-500 font-medium">{stat.label}</p>
						<h2 className="md:text-[26px] md:leading-7">USD {stat.value}</h2>
					</div>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									onMouseEnter={() => handleInfoHover(stat.label)}
									onMouseLeave={handleInfoLeave}
									className="mt-2"
									aria-label={`Info about ${stat.label}`}
								>
									<InfoIcon
										strokeWidth={1.3}
										className="text-gray-400 size-5 transition-colors"
									/>
								</button>
							</TooltipTrigger>
							<TooltipContent>
								<p className="text-sm">
									{stat.tooltip || `Information about ${stat.label}`}
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			))}
		</div>
	);
}

"use client";

import { InfoIcon } from "lucide-react";
import { useState, useEffectEvent } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface BalanceStat {
	label: string;
	value: string;
	tooltip?: string;
}

interface BalanceStatsProps {
	stats: BalanceStat[];
}

export function BalanceStats({ stats }: BalanceStatsProps) {
	const [_hoveredStat, setHoveredStat] = useState<string | null>(null);

	const handleInfoHover = useEffectEvent((label: string) => {
		setHoveredStat(label);
	});

	const handleInfoLeave = useEffectEvent(() => {
		setHoveredStat(null);
	});

	return (
		<div className="space-y-8 flex flex-col justify-between h-[95%]">
			{stats.map((stat) => (
				<div key={stat.label} className="flex items-start justify-between">
					<div className="space-y-0.5">
						<p className="text-sm text-gray-500 font-medium">{stat.label}</p>
						<h2 className="md:text-3xl">USD {stat.value}</h2>
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

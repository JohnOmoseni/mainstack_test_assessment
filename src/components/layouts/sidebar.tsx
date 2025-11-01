"use client";

import { cn } from "@/lib/utils";
import { Link2, Briefcase, Folder, Lock } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const sidebarItems = [
	{ icon: Link2, label: "Links", active: false },
	{ icon: Briefcase, label: "Business", active: true },
	{ icon: Folder, label: "Files", active: false },
	{ icon: Lock, label: "Security", active: false },
];

export function Sidebar() {
	return (
		<TooltipProvider delayDuration={0}>
			<aside className="fixed left-6 top-[calc(min(50%,720px)-4rem)] -translate-y-1/2 z-40 w-12 origin-top bg-background rounded-full px-1 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
				<div className="flex flex-col items-center gap-4 p-2">
					{sidebarItems.map((item, index) => (
						<Tooltip key={index}>
							<TooltipTrigger asChild>
								<button
									className={cn(
										"flex size-10 flex-row-center rounded-full transition-colors hover:bg-gray-50 inverted-colors:bg-gray-100",
										item.active ? "bg-gray-25" : "text-muted-foreground"
									)}
									aria-label={item.label}
								>
									<item.icon className="size-5" />
								</button>
							</TooltipTrigger>
							<TooltipContent side="right" align="center" className="text-sm">
								{item.label}
							</TooltipContent>
						</Tooltip>
					))}
				</div>
			</aside>
		</TooltipProvider>
	);
}

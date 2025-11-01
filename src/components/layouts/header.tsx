"use client";

import {
	Bell,
	MessageSquare,
	Menu,
	Home,
	ChartBar,
	Users,
	Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

import images from "@/constants/icons";

const navItems = [
	{ label: "Home", href: "/", icon: Home },
	{ label: "Analytics", icon: ChartBar, href: "/analytics" },
	{ label: "Revenue", icon: Wallet, href: "/revenue", active: true },
	{ label: "CRM", icon: Users, href: "/crm" },
	{ label: "Apps", icon: Menu, href: "/apps" },
];

export function Header() {
	return (
		<header className="sticky top-3 z-50 w-[95%] mx-auto my-3.5 border-b border-border bg-background rounded-full shadow-[0_0_4px_rgba(0,0,0,0.08)] transition-all">
			<div className="flex h-16 items-center justify-between px-6">
				<div className="flex items-center gap-2">
					<img src={images.logo} alt="logo" className="size-9" />
				</div>

				<nav className="hidden min-[850px]:flex items-center gap-1">
					{navItems.map((item) => (
						<Link
							key={item.label}
							to={item.href}
							className={cn(
								"flex items-center gap-2 px-5 py-2 h-10 rounded-full text-sm font-medium transition-colors",
								item.active
									? "bg-foreground text-background font-semibold"
									: "hover:bg-muted"
							)}
						>
							<item.icon className="size-4" />
							{item.label}
						</Link>
					))}
				</nav>

				{/* Right side actions */}
				<div className="flex items-center gap-4">
					<Button variant="ghost" size="icon" className="relative">
						<Bell strokeWidth={1.4} className="h-5 w-5 text-gray-500" />
					</Button>
					<Button variant="ghost" size="icon">
						<MessageSquare
							strokeWidth={1.4}
							className="h-5 w-5 text-gray-500"
						/>
					</Button>

					<div className="flex items-center bg-[#EFF1F6] w-[84px] rounded-full py-1 px-1">
						<Avatar className="h-8 w-8 bg-foreground">
							<AvatarFallback className="bg-foreground text-background text-xs font-semibold">
								OJ
							</AvatarFallback>
						</Avatar>
						<Button variant="ghost" size="icon" className="">
							<Menu strokeWidth={1.4} className="h-5 w-5" />
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}

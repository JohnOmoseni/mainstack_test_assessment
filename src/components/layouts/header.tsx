"use client";

import {
	Bell,
	MessageSquare,
	Menu,
	Home,
	Users,
	Wallet,
	Settings,
	FileText,
	Briefcase,
	Grid3x3,
	Bug,
	LogOut,
	ChevronRight,
	UserSearch,
	ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetUserProfileService } from "@/server/action/useServerActions";
import images, {
	ChartIcon,
	ProductIcon1,
	ProductIcon2,
	ProductIcon3,
	ProductIcon4,
	WidgetIcon,
} from "@/constants/icons";
import { useEffectEvent, useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const navItems = [
	{ label: "Home", href: "/", icon: Home },
	{ label: "Analytics", icon: ChartIcon, href: "/analytics" },
	{ label: "Revenue", icon: Wallet, href: "/revenue" },
	{ label: "CRM", icon: Users, href: "/crm" },
	{ label: "Apps", icon: WidgetIcon, href: "/apps", hasPopover: true },
];

const appItems = [
	{
		id: "link-in-bio",
		name: "Link in Bio",
		description: "Manage your Link in Bio",
		icon: ProductIcon1,
		iconBg: "bg-gradient-to-br from-purple-400 to-pink-400",
		hasSubmenu: false,
	},
	{
		id: "store",
		name: "Store",
		description: "Manage your Store activities",
		icon: ProductIcon2,
		hasSubmenu: true,
	},
	{
		id: "media-kit",
		name: "Media Kit",
		description: "Manage your Media Kit",
		icon: ProductIcon3,
		hasSubmenu: false,
	},
	{
		id: "invoicing",
		name: "Invoicing",
		description: "Manage your Invoices",
		icon: ProductIcon4,
		hasSubmenu: false,
	},
	{
		id: "bookings",
		name: "Bookings",
		description: "Manage your Bookings",
		icon: ProductIcon3,
		hasSubmenu: false,
	},
];

const userMenuItems = [
	{ id: "settings", label: "Settings", icon: Settings },
	{ id: "purchase-history", label: "Purchase History", icon: FileText },
	{ id: "refer-earn", label: "Refer and Earn", icon: Briefcase },
	{ id: "integrations", label: "Integrations", icon: Grid3x3 },
	{ id: "report-bug", label: "Report Bug", icon: Bug },
	{ id: "switch-account", label: "Switch Account", icon: UserSearch },
	{ id: "sign-out", label: "Sign Out", icon: LogOut },
];

export function Header() {
	const { data: user_profile } = useGetUserProfileService();
	const location = useLocation();
	const currentPath = location.pathname;

	const [isAppsOpen, setIsAppsOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [selectedApp, setSelectedApp] = useState("Link in Bio");

	const handleMenuItemClick = useEffectEvent((_itemId: string) => {
		setIsProfileOpen(false);
	});

	const handleAppItemClick = useEffectEvent(
		(_appId: string, appName: string) => {
			setSelectedApp(appName);
		}
	);

	const profile = useMemo(() => {
		return {
			...user_profile,
			first_name: user_profile?.first_name || "Unknown",
			last_name: user_profile?.last_name || "",
			name: `${user_profile?.first_name} ${user_profile?.last_name}`,
			email: user_profile?.email || "unknown",
		};
	}, [user_profile]);

	return (
		<header className="sticky top-3 z-50 w-[95%] mx-auto my-3.5 border-b border-border bg-background rounded-full shadow-[0_0_4px_rgba(0,0,0,0.08)] transition-all">
			<div className="flex h-16 items-center justify-between px-6">
				<div className="flex items-center gap-2">
					<img src={images.logo} alt="logo" className="size-9" />
				</div>

				<nav className="hidden min-[850px]:flex items-center gap-1">
					{navItems.map((item) => {
						const isActive =
							item.href === "/"
								? currentPath === item.href
								: currentPath.startsWith(item.href);

						if (item.hasPopover && item.label === "Apps") {
							return (
								<Popover
									key={item.label}
									open={isAppsOpen}
									onOpenChange={setIsAppsOpen}
								>
									<PopoverTrigger asChild>
										<button
											className={cn(
												"flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium  transition-all",
												isAppsOpen
													? "bg-foreground text-background font-semibold"
													: "hover:bg-muted"
											)}
										>
											<svg
												className="w-4 h-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
												/>
											</svg>
											{item.label}

											{isAppsOpen && (
												<div className="*:text-white flex gap-2 items-center ml-1.5 pl-3 border-l border-gray-300">
													{selectedApp}
													<ChevronDown className="h-4 w-4 text-muted-foreground" />
												</div>
											)}
										</button>
									</PopoverTrigger>
									<PopoverContent
										className="w-[400px] p-0 py-1"
										align="start"
										sideOffset={8}
									>
										<div className="p-2">
											{appItems.map((app) => {
												const Icon = app.icon;
												return (
													<button
														key={app.id}
														onClick={() => handleAppItemClick(app.id, app.name)}
														className="flex items-center gap-3 w-full p-3 group hover:border hover:shadow-xs rounded-lg transition-colors"
													>
														<div
															className={cn(
																"p-2 rounded-lg border border-gray-100"
															)}
														>
															<Icon className="h-5 w-5 text-white" />
														</div>
														<div className="flex-1 text-left">
															<div className="font-medium text-sm">
																{app.name}
															</div>
															<div className="text-xs text-muted-foreground">
																{app.description}
															</div>
														</div>
														{app.hasSubmenu && (
															<ChevronRight
																strokeWidth={1.4}
																className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
															/>
														)}
													</button>
												);
											})}
										</div>
									</PopoverContent>
								</Popover>
							);
						}

						return (
							<Link
								key={item.label}
								to={item.href}
								className={cn(
									"flex items-center gap-2 px-5 py-2 h-10 rounded-full text-sm font-medium transition-colors",
									isActive
										? "bg-foreground text-background font-semibold"
										: "hover:bg-muted"
								)}
							>
								{item.icon === ChartIcon ? (
									<item.icon
										color="white"
										className={cn(
											"size-5 ",
											isActive ? " stroke-background font-semibold" : ""
										)}
									/>
								) : (
									<item.icon className="size-4" />
								)}
								{item.label}
							</Link>
						);
					})}
				</nav>

				{/* Right side actions */}
				<TooltipProvider>
					<div className="flex items-center gap-4">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" size="icon" className="relative">
									<Bell strokeWidth={1.4} className="h-5 w-5 text-gray-500" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">
								<p>Notifications</p>
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" size="icon">
									<MessageSquare
										strokeWidth={1.4}
										className="h-5 w-5 text-gray-500"
									/>
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">
								<p>Messages</p>
							</TooltipContent>
						</Tooltip>

						<Popover open={isProfileOpen} onOpenChange={setIsProfileOpen}>
							<PopoverTrigger asChild>
								<div className="flex items-center bg-[#EFF1F6] w-[84px] rounded-full py-1 px-1 cursor-pointer">
									<Tooltip>
										<TooltipTrigger asChild>
											<Avatar className="h-8 w-8 bg-foreground">
												<AvatarFallback className="bg-foreground uppercase text-background text-xs font-semibold">
													{profile.name?.charAt(0)}
													{profile.name?.charAt(1)}
												</AvatarFallback>
											</Avatar>
										</TooltipTrigger>
										<TooltipContent side="bottom">
											<p>Profile Menu</p>
										</TooltipContent>
									</Tooltip>

									<Button variant="ghost" size="icon">
										<Menu strokeWidth={1.4} className="h-5 w-5" />
									</Button>
								</div>
							</PopoverTrigger>
							<PopoverContent
								className="w-[320px] p-0"
								align="end"
								sideOffset={8}
							>
								{/* User Profile Section */}
								<div className="p-4 border-b border-gray-100">
									<div className="flex items-center gap-3">
										<Avatar className="size-10 bg-foreground">
											<AvatarFallback className="text-background uppercase text-lg bg-linear-to-br from-gray-400 via-10% to-gray-900 leading-0 font-bold">
												{profile.name?.charAt(0)}
												{profile.name?.charAt(1)}
											</AvatarFallback>
										</Avatar>
										<div>
											<div className="font-semibold">{profile.name}</div>
											<div className="text-sm">{profile.email}</div>
										</div>
									</div>
								</div>

								{/* Menu Items */}
								<div className="p-2 pb-3">
									{userMenuItems.map((item) => {
										const Icon = item.icon;
										return (
											<button
												key={item.id}
												onClick={() => handleMenuItemClick(item.id)}
												className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted transition-colors text-left"
											>
												<Icon className="h-5 w-5 text-gray-400" />
												<span className="font-medium text-sm">
													{item.label}
												</span>
											</button>
										);
									})}
								</div>
							</PopoverContent>
						</Popover>
					</div>
				</TooltipProvider>
			</div>
		</header>
	);
}

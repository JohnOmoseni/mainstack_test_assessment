"use client";
import { Header } from "@/components/layouts/header";
import { Sidebar } from "@/components/layouts/sidebar";
import { BalanceStats } from "./balance_stats";
import Transactions from "./transactions";
import BalanceChart from "./balance_chart";

export default function RevenuePage() {
	return (
		<div className="max-w-[3100px] mx-auto relative translate-z-0">
			<div className="h-svh overflow-y-auto">
				<Header />

				<div className="hidden md:block">
					<Sidebar />
				</div>
				{/* Main Content */}
				<main className="md:ml-24 pt-8 md:pt-12 px-6 md:px-10 md:pr-16 mb-16">
					<div className="max-w-[1800px] mx-auto space-y-16">
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[min(40vh,450px)] md:gap-16 xl:gap-24">
							<div className="lg:col-span-2 space-y-8">
								<BalanceChart />
							</div>

							<div className="lg:col-span-1">
								<BalanceStats />
							</div>
						</div>

						<Transactions />
					</div>
				</main>
			</div>
		</div>
	);
}

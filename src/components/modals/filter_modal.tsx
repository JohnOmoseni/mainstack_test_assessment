import { startTransition, useEffect, useState } from "react";
import { DatePicker } from "@/components/ui/date_picker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../ui/button";
import { parseAsString, useQueryStates } from "nuqs";
import { cn } from "@/lib/utils";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import MultipleSelector from "../ui/customs/multi_select";
import * as yup from "yup";
import { Label } from "../ui/label";
import { endOfMonth, format, startOfMonth, subDays } from "date-fns";

const TRANSACTION_STATUS_LIST = [
	{
		label: "Successful",
		value: "successful",
	},

	{
		label: "Pending",
		value: "pending",
	},
	{
		label: "Failed",
		value: "failed",
	},
];

const TRANSACTION_TYPE_LIST = [
	{
		label: "Store Transactions",
		value: "store_transactions",
	},

	{
		label: "Get Tipped",
		value: "get_tipped",
	},
	{
		label: "Withdrawals",
		value: "withdrawal",
	},
	{
		label: "Deposits",
		value: "deposit",
	},
	{
		label: "Chargebacks",
		value: "chargebacks",
	},
	{
		label: "Cashbacks",
		value: "cashbacks",
	},
	{
		label: "Refer & Earn",
		value: "refer_and_earn",
	},
];

const TIME_RANGES = ["Today", "Last 7 days", "This month", "Last 3 months"];

const getDateRange = (range: string): [string, string] => {
	const today = new Date();
	let start: Date;
	let end: Date = today;

	switch (range) {
		case "Today":
			start = today;
			end = today;
			break;
		case "Last 7 days":
			start = subDays(today, 6);
			break;
		case "This month":
			start = startOfMonth(today);
			end = endOfMonth(today);
			break;
		case "Last 3 months":
			start = subDays(today, 90);
			break;
		default:
			start = today;
			end = today;
	}

	return [format(start, "yyyy-MM-dd"), format(end, "yyyy-MM-dd")];
};

const FilterSchema = yup.object({
	start_date: yup
		.string()
		.nullable()
		.optional()
		.test("valid-date", "Invalid date format", (val) => {
			if (!val) return true;
			return !isNaN(Date.parse(val));
		}),

	end_date: yup
		.string()
		.nullable()
		.optional()
		.test("valid-date", "Invalid date format", (val) => {
			if (!val) return true;
			return !isNaN(Date.parse(val));
		})
		.test(
			"after-start",
			"End date cannot be before start date",
			function (val) {
				const { start_date } = this.parent;
				if (val && start_date) {
					return new Date(val) >= new Date(start_date);
				}
				return true;
			}
		),
	transaction_type: yup
		.array()
		.of(yup.string().optional().default(""))
		.nullable(),
	transaction_status: yup
		.array()
		.of(yup.string().optional().default(""))
		.nullable(),
});

const FilterModal = ({ trigger }: { trigger: React.ReactNode }) => {
	const [{ date_range, transaction_type, transaction_status }, setFilters] =
		useQueryStates(
			{
				date_range: parseAsString.withDefault(""),
				transaction_type: parseAsString.withDefault(""),
				transaction_status: parseAsString.withDefault(""),
			},
			{
				shallow: false,
				startTransition,
			}
		);
	const [selectedTimeRange, setSelectedTimeRange] = useState<string>("");
	const [open, setOpen] = useState(false);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			start_date: null,
			end_date: null,
			transaction_type: transaction_type ? transaction_type.split(",") : [],
			transaction_status: transaction_status
				? transaction_status.split(",")
				: [],
		},
		resolver: yupResolver(FilterSchema),
		mode: "onChange",
	});

	useEffect(() => {
		reset({
			start_date: date_range ? date_range.split("_")[0] : "",
			end_date: date_range ? date_range.split("_")[1] : "",
			transaction_type: transaction_type ? transaction_type.split(",") : [],
			transaction_status: transaction_status
				? transaction_status.split(",")
				: [],
		});
	}, [date_range, transaction_type, transaction_status, reset]);

	const handleTimeRangeSelect = (range: string) => {
		const [] = getDateRange(range);
		setSelectedTimeRange(range);

		reset({
			...reset,
			// start_date: start,
			// end_date: end,
		});
	};

	const onApplyFilter = handleSubmit((values) => {
		startTransition(() => {
			setFilters({
				date_range:
					values.start_date && values.end_date
						? `${values.start_date}_${values.end_date}`
						: "",
				transaction_type: values.transaction_type?.join(",") || "",
				transaction_status: values.transaction_status?.join(",") || "",
			});
		});
		setOpen(false);
	});

	const onClearFilter = () => {
		startTransition(() => {
			setFilters({
				date_range: "",
				transaction_type: "",
				transaction_status: "",
			});
		});
		reset();
		setSelectedTimeRange("");
	};

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>{trigger}</SheetTrigger>
			<SheetContent className="w-full max-w-[320px] min-[420px]:max-w-[400px] sm:max-w-[460px] rounded-3xl overflow-hidden p-0 ">
				<SheetHeader className="space-y-0">
					<SheetTitle className="text-2xl font-bold">Filter</SheetTitle>
				</SheetHeader>

				<div className="h-full flex flex-col mt-2 mb-4 px-4">
					<div className="flex overflow-x-auto remove-scrollbar gap-2 px-1.5">
						{TIME_RANGES.map((range) => (
							<Button
								key={range}
								variant={selectedTimeRange === range ? "default" : "outline"}
								size="sm"
								onClick={() => handleTimeRangeSelect(range)}
								className={cn(
									"rounded-full py-5 min-w-[120px]",
									selectedTimeRange === range ? "" : "hover:bg-muted/90"
								)}
							>
								{range}
							</Button>
						))}
					</div>

					<form className="flex flex-col gap-6 mt-10 w-full">
						<div className="space-y-2">
							<Label htmlFor="date" className="px-1">
								Date Range
							</Label>

							<div className="grid grid-cols-2 gap-4">
								<Controller
									name="start_date"
									control={control}
									render={({ field }) => (
										<div className="flex flex-col gap-1">
											<DatePicker
												placeholder="Select start date"
												name="start_date"
												value={field.value as any}
												onChange={field.onChange}
												toYear={50}
												disablePastDates={true}
											/>
											{errors.start_date && (
												<p className="error-msg mt-1">
													{errors.start_date.message}
												</p>
											)}
										</div>
									)}
								/>
								<Controller
									name="end_date"
									control={control}
									render={({ field }) => (
										<div className="flex flex-col gap-1">
											<DatePicker
												placeholder="Select end date"
												name="end_date"
												value={field.value as any}
												onChange={field.onChange}
												toYear={50}
												disablePastDates={true}
											/>
											{errors.end_date && (
												<p className="error-msg mt-1">
													{errors.end_date.message}
												</p>
											)}
										</div>
									)}
								/>
							</div>
						</div>

						<Controller
							name="transaction_type"
							control={control}
							render={({ field }) => (
								<div className="flex flex-col">
									<MultipleSelector
										label="Transaction Type"
										triggerText="Select transaction type(s)"
										options={TRANSACTION_TYPE_LIST}
										value={field.value || []}
										onChange={field.onChange}
									/>

									{errors.transaction_type && (
										<p className="error-msg mt-1">
											{errors.transaction_type?.message}
										</p>
									)}
								</div>
							)}
						/>

						<Controller
							name="transaction_status"
							control={control}
							render={({ field }) => (
								<div className="flex flex-col">
									<MultipleSelector
										label="Transaction Status"
										triggerText="Select transaction status(es)"
										options={TRANSACTION_STATUS_LIST}
										value={field.value || []}
										onChange={field.onChange}
									/>

									{errors.transaction_status && (
										<p className="error-msg mt-1">
											{errors.transaction_status?.message}
										</p>
									)}
								</div>
							)}
						/>
					</form>

					{/* Action Buttons */}
					<div className="flex items-center gap-3 mt-auto">
						<Button
							variant="outline"
							className="flex-1"
							onClick={onClearFilter}
						>
							Clear
						</Button>
						<Button
							disabled={!isValid}
							className="flex-1"
							onClick={onApplyFilter}
						>
							Apply
						</Button>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default FilterModal;

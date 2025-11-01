"use client";

import * as React from "react";
import { CalendarIcon, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type DatePickerProps = {
	label?: string;
	name: string;
	value: Date | undefined;
	onChange: (date: Date | undefined) => void;
	showTime?: boolean;
	placeholder?: string;
	disabled?: boolean;
	maxDate?: Date;
	minDate?: Date;
	toYear?: number;
	disablePastDates?: boolean;
};

export function DatePicker({
	label,
	name,
	value,
	onChange,
	toYear = 0,
	showTime = false,
	disabled = false,
	placeholder,
	maxDate,
	minDate,
	disablePastDates,
}: DatePickerProps) {
	const [open, setOpen] = React.useState(false);
	const [timeOpen, setTimeOpen] = React.useState(false);
	const [selectedTime, setSelectedTime] = React.useState({
		hours: value && value instanceof Date ? value.getHours() : 0,
		minutes: value && value instanceof Date ? value.getMinutes() : 0,
	});

	// Generate time options
	const hours = Array.from({ length: 24 }, (_, i) => i);
	const minutes = Array.from({ length: 60 }, (_, i) => i);

	const disabledDays = React.useMemo(() => {
		const today = new Date();
		const rules: any[] = [];

		if (disablePastDates) rules.push({ before: today });
		if (minDate) rules.push({ before: minDate });
		if (maxDate) rules.push({ after: maxDate });

		return rules.length > 0 ? rules : undefined;
	}, [disablePastDates, minDate, maxDate]);

	const handleDateSelect = (date: Date | undefined) => {
		if (date) {
			// Combine selected date with current time or default time
			const combinedDate = new Date(date);
			combinedDate.setHours(selectedTime.hours, selectedTime.minutes, 0, 0);
			onChange(combinedDate);
		} else {
			onChange(undefined);
		}
		setOpen(false);
	};

	const handleTimeChange = (type: "hours" | "minutes", value: string) => {
		const newTime = {
			...selectedTime,
			[type]: parseInt(value),
		};
		setSelectedTime(newTime);

		// Update the current date with new time
		if (value && value) {
			const updatedDate = new Date();
			updatedDate.setHours(newTime.hours, newTime.minutes, 0, 0);
			onChange(updatedDate);
		}
	};

	const formatDisplayValue = () => {
		if (!value || !(value instanceof Date)) return placeholder || "Pick a date";

		const dateStr = value.toLocaleDateString();
		if (showTime) {
			const timeStr = value.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
			});
			return `${dateStr} ${timeStr}`;
		}
		return dateStr;
	};

	return (
		<div className="flex flex-col gap-2">
			{label && (
				<Label htmlFor="date" className="px-1">
					{label}
				</Label>
			)}
			<div className="flex gap-2">
				<Popover modal={true} open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							id={name}
							className="flex-1 justify-between font-normal rounded-lg min-h-[40px]"
							disabled={disabled}
						>
							{formatDisplayValue()}
							<CalendarIcon
								strokeWidth={1.3}
								className="size-4 text-gray-500"
							/>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto overflow-hidden p-0" align="start">
						<Calendar
							mode="single"
							selected={value}
							captionLayout="dropdown"
							onSelect={handleDateSelect}
							startMonth={new Date(1960, 0)}
							endMonth={new Date(new Date().getFullYear() + toYear, 11)} //
							disabled={disabledDays}
						/>
					</PopoverContent>
				</Popover>

				{showTime && (
					<Popover modal={true} open={timeOpen} onOpenChange={setTimeOpen}>
						<PopoverTrigger asChild>
							<Button variant="outline" className="px-3 font-normal rounded-lg">
								<Clock className="h-4 w-4 text-muted-foreground" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-3" align="start">
							<div className="flex items-center gap-2">
								<Select
									value={selectedTime.hours.toString()}
									onValueChange={(value) => handleTimeChange("hours", value)}
								>
									<SelectTrigger className="w-20">
										<SelectValue />
									</SelectTrigger>
									<SelectContent className="h-[380px]">
										{hours.map((hour) => (
											<SelectItem key={hour} value={hour.toString()}>
												{hour.toString().padStart(2, "0")}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<span className="text-muted-foreground">:</span>
								<Select
									value={selectedTime.minutes.toString()}
									onValueChange={(value) => handleTimeChange("minutes", value)}
								>
									<SelectTrigger className="w-20">
										<SelectValue />
									</SelectTrigger>
									<SelectContent className="h-[380px]">
										{minutes.map((minute) => (
											<SelectItem key={minute} value={minute.toString()}>
												{minute.toString().padStart(2, "0")}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</PopoverContent>
					</Popover>
				)}
			</div>
		</div>
	);
}

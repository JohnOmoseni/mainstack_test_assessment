"use client";

import { useState } from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";

export interface OptionType {
	label: string;
	value: string;
}

interface MultipleSelectorProps {
	label?: string;
	triggerText?: string;
	options: OptionType[];
	value: string[];
	onChange: (values: string[]) => void;
	variant?: "outline" | "ghost" | "filled";
}

export default function MultipleSelector({
	label,
	triggerText = "Select options",
	options,
	value = [],
	onChange,
}: MultipleSelectorProps) {
	const [open, setOpen] = useState(false);

	const handleToggle = (optionValue: string, checked: boolean) => {
		if (checked) {
			onChange([...value, optionValue]);
		} else {
			onChange(value.filter((v) => v !== optionValue));
		}
	};

	const selectedLabels = options
		.filter((opt) => value.includes(opt.value))
		.map((opt) => opt.label)
		.join(", ");

	return (
		<div className="flex flex-col gap-2">
			{label && <Label className="font-medium text-sm">{label}</Label>}

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						role="combobox"
						variant={"outline"}
						aria-expanded={open}
						className={cn(
							"w-full rounded-lg justify-between",
							"focus-visible::border-ring focus-visible::ring-ring/50 focus-visible::ring-[3px]",
							!value.length && "text-muted-foreground"
						)}
					>
						<p
							title={selectedLabels}
							className="text-sm md:text-base font-normal text-left truncate"
						>
							{selectedLabels || triggerText}
						</p>
						<ChevronsUpDown className="ml-2 h-4 w-4 opacity-50 shrink-0" />
					</Button>
				</PopoverTrigger>

				<PopoverContent className="w-full sheet px-2 py-3 max-h-[400px] overflow-y-auto space-y-3">
					{options.map((opt) => {
						const isChecked = value.includes(opt.value);
						return (
							<div
								key={opt.value}
								className="flex items-center gap-2.5 py-1.5 px-2 rounded-md hover:bg-accent/50 cursor-pointer"
								// onClick={() => handleToggle(opt.value, !isChecked)}
							>
								<Checkbox
									checked={isChecked}
									onCheckedChange={(checked) =>
										handleToggle(opt.value, !!checked)
									}
									id={opt.value}
								/>
								<Label
									htmlFor={opt.value}
									className="text-[15px] w-max font-medium leading-none cursor-pointer"
								>
									{opt.label}
								</Label>
							</div>
						);
					})}

					{!options.length && (
						<p className="text-sm text-muted-foreground p-2 text-center">
							No options available
						</p>
					)}
				</PopoverContent>
			</Popover>
		</div>
	);
}

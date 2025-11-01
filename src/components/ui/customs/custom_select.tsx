import {
	Select as SelectPrimitive,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Label } from "../label";

export const SelectVariant = {
	FILLED: "filled",
	OUTLINE: "outline",
	GHOST: "ghost",
} as const;

type SelectProps = {
	triggerText: string;
	content: any[];
	containerClass?: string;
	variant?: "filled" | "outline" | "ghost";
	disabled?: boolean;
	name?: string;
	value?: string;
	onChange?: ((value: string) => void) | undefined;
	label?: string;
	optional?: boolean;
	itemClassName?: string;
	contentClassName?: string;
};
const Select = ({
	triggerText,
	content,
	containerClass,
	variant = "outline",
	disabled,
	name,
	value,
	onChange,
	label,
	optional,
	itemClassName,
	contentClassName,
}: SelectProps) => {
	return (
		<div className="flex flex-col gap-2 shrink-0">
			{label && (
				<Label className="text-accent dark:text-gray-300 3xl:text-[1.1rem]">
					{`${label} ${optional ? "(Optional)" : ""}` || ""}
				</Label>
			)}
			<SelectPrimitive
				disabled={disabled ? true : false}
				name={name}
				value={value}
				onValueChange={(value) => value && onChange?.(value)}
			>
				<SelectTrigger
					className={cn(
						"border truncate py-1 bg-transparent text-gray-600 flex items-center gap-1 w-auto focus-within:ring-0 focus:ring-0 focus-visible:ring-0 placeholder:text-gray-300 focus:outline-none h-12",
						variant === SelectVariant.FILLED
							? "border-none bg-gray-50 hover:bg-gray-100 dark:bg-gray-600 px-2 gap-3"
							: variant === SelectVariant.OUTLINE
							? "border-gray-100 bg-transparent px-3 gap-3"
							: "bg-transparent gap-3 hover:bg-transparent",
						containerClass
					)}
				>
					{content?.filter((item) => item.value === value)[0]?.label ??
						triggerText}
				</SelectTrigger>
				<SelectContent
					className={cn("border-none 3xl:max-h-[1400px]", contentClassName)}
				>
					{content?.length > 0 ? (
						content.map((item, idx) => (
							<SelectItem
								key={`select-item-${idx}-${item.label}`}
								value={item.value}
								className={cn(
									"focus:bg-gray-50 hover:text-accent focus:text-foreground cursor-pointer gap-1 py-2",
									!item.icon && "pl-3",
									itemClassName
								)}
							>
								<div className="flex items-center gap-2">
									{item.icon && <p>{item.icon}</p>}
									<p>{item.label}</p>
								</div>
							</SelectItem>
						))
					) : (
						<SelectItem
							key={"no-option"}
							value="null"
							className={cn("shad-select-item no-option")}
						>
							No item
						</SelectItem>
					)}
				</SelectContent>
			</SelectPrimitive>
		</div>
	);
};

export default Select;

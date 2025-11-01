import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 2xl:whitespace-nowrap rounded-full text-sm md:text-base  transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none  shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer disabled:cursor-not-allowed [*>svg]:pointer-events-none [&>*]:mt-px",
	{
		variants: {
			variant: {
				default:
					"bg-gray-900 border border-gray-900 min-w-[100px] cursor-pointer text-white hover:brightness-90 font-medium tracking-wide disabled:bg-[#DBDEE5] disabled:border-none disabled:opacity-90",
				destructive:
					"bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline:
					"border min-w-[130px] border-input bg-white [&>*]:text-foreground  hover:bg-gray-50 hover:border-gray-200 hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost:
					"hover:bg-transparent cursor-pointer hover:text-accent-foreground dark:hover:bg-accent/50",
				link: "underline-offset-4 hover:underline hover:text-gray-600",
			},
			size: {
				default: "min-h-[48px] max-h-[68px] px-4 py-2",
				sm: "h-8 rounded-md gap-1.5 px-3 max-sm:has-[>svg]:px-1.5 has-[>svg]:px-2.5",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
				icon: "size-9",
				ghost: "",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	loading = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
		loading?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			type="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
			disabled={loading || props.disabled}
		>
			{loading ? (
				<Loader2 className="animate-spin" size={16} />
			) : (
				props.children
			)}
		</Comp>
	);
}

export { Button, buttonVariants };

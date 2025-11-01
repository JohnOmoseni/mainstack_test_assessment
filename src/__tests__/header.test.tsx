// @ts-ignore
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "@/components/layouts/header";

describe("Header", () => {
	it("renders the navigation items", () => {
		render(<Header />);

		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Analytics")).toBeInTheDocument();
		expect(screen.getByText("Revenue")).toBeInTheDocument();
		expect(screen.getByText("CRM")).toBeInTheDocument();
		expect(screen.getByText("Apps")).toBeInTheDocument();
	});

	it("highlights the active navigation item", () => {
		render(<Header />);

		const revenueLink = screen.getByText("Revenue").closest("a");
		expect(revenueLink).toHaveClass("bg-foreground");
	});

	it("renders action buttons", () => {
		render(<Header />);

		const buttons = screen.getAllByRole("button");
		expect(buttons.length).toBeGreaterThan(0);
	});

	it("renders user avatar with initials", () => {
		render(<Header />);

		expect(screen.getByText("ON")).toBeInTheDocument();
	});
});

// @ts-nocheck
const { render, screen, fireEvent } = require("@testing-library/react");
require("@testing-library/jest-dom");
const { Sidebar } = require("@/components/layouts/sidebar");

describe("Sidebar Component", () => {
	it("renders all sidebar buttons", () => {
		render(<Sidebar />);

		const buttons = screen.getAllByRole("button");
		expect(buttons).toHaveLength(4);

		expect(screen.getByLabelText("Links")).toBeInTheDocument();
		expect(screen.getByLabelText("Business")).toBeInTheDocument();
		expect(screen.getByLabelText("Files")).toBeInTheDocument();
		expect(screen.getByLabelText("Security")).toBeInTheDocument();
	});

	it("renders tooltip content for each item", async () => {
		render(<Sidebar />);

		const buttons = screen.getAllByRole("button");
		for (const button of buttons) {
			fireEvent.mouseEnter(button);
			const label = button.getAttribute("aria-label");
			if (label) {
				expect(await screen.findByText(label)).toBeInTheDocument();
			}
			fireEvent.mouseLeave(button);
		}
	});

	it("has consistent structure and styling", () => {
		const { container } = render(<Sidebar />);

		// Sidebar container should exist
		const aside = container.querySelector("aside");
		expect(aside).toBeInTheDocument();
		expect(aside).toHaveClass("fixed", "rounded-full");

		const buttons = screen.getAllByRole("button");
		buttons.forEach((btn) => {
			expect(btn).toHaveClass("rounded-full");
			expect(btn).toHaveClass("transition-colors");
		});
	});
});

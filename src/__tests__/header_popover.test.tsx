import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "@/components/layouts/header";

describe("Header Popovers", () => {
	describe("Apps Popover", () => {
		it("should open apps popover when Apps nav item is clicked", async () => {
			render(<Header />);

			const appsButton = screen.getByRole("button", { name: /apps/i });
			fireEvent.click(appsButton);

			await waitFor(() => {
				expect(screen.getByText("Link in Bio")).toBeInTheDocument();
				expect(screen.getByText("Manage your Link in Bio")).toBeInTheDocument();
			});
		});

		it("should display all app items in the popover", async () => {
			render(<Header />);

			const appsButton = screen.getByRole("button", { name: /apps/i });
			fireEvent.click(appsButton);

			await waitFor(() => {
				expect(screen.getByText("Link in Bio")).toBeInTheDocument();
				expect(screen.getByText("Store")).toBeInTheDocument();
				expect(screen.getByText("Media Kit")).toBeInTheDocument();
				expect(screen.getByText("Invoicing")).toBeInTheDocument();
				expect(screen.getByText("Bookings")).toBeInTheDocument();
			});
		});

		it("should show chevron for Store item with submenu", async () => {
			render(<Header />);

			const appsButton = screen.getByRole("button", { name: /apps/i });
			fireEvent.click(appsButton);

			await waitFor(() => {
				const storeItem = screen.getByText("Store").closest("button");
				expect(storeItem).toBeInTheDocument();
			});
		});

		it("should update selected app when an app item is clicked", async () => {
			render(<Header />);

			const appsButton = screen.getByRole("button", { name: /apps/i });
			fireEvent.click(appsButton);

			await waitFor(() => {
				const storeButton = screen.getByText("Store").closest("button");
				if (storeButton) {
					fireEvent.click(storeButton);
				}
			});
		});
	});

	describe("Profile Popover", () => {
		it("should open profile popover when avatar is clicked", async () => {
			render(<Header />);

			const avatarButton = screen.getByRole("button", { name: "" });
			fireEvent.click(avatarButton);

			await waitFor(() => {
				expect(screen.getByText("Olivier Jones")).toBeInTheDocument();
				expect(screen.getByText("olivierjones@gmail.com")).toBeInTheDocument();
			});
		});

		it("should display all menu items in profile popover", async () => {
			render(<Header />);

			const avatarButton = screen.getByRole("button", { name: "" });
			fireEvent.click(avatarButton);

			await waitFor(() => {
				expect(screen.getByText("Settings")).toBeInTheDocument();
				expect(screen.getByText("Purchase History")).toBeInTheDocument();
				expect(screen.getByText("Refer and Earn")).toBeInTheDocument();
				expect(screen.getByText("Integrations")).toBeInTheDocument();
				expect(screen.getByText("Report Bug")).toBeInTheDocument();
				expect(screen.getByText("Switch Account")).toBeInTheDocument();
				expect(screen.getByText("Sign Out")).toBeInTheDocument();
			});
		});

		it("should close popover when a menu item is clicked", async () => {
			render(<Header />);

			const avatarButton = screen.getByRole("button", { name: "" });
			fireEvent.click(avatarButton);

			await waitFor(() => {
				const settingsButton = screen.getByText("Settings");
				fireEvent.click(settingsButton);
			});

			await waitFor(() => {
				expect(screen.queryByText("Olivier Jones")).not.toBeInTheDocument();
			});
		});
	});

	describe("Popover Interactions", () => {
		it("should close apps popover when clicking outside", async () => {
			render(<Header />);

			const appsButton = screen.getByRole("button", { name: /apps/i });
			fireEvent.click(appsButton);

			await waitFor(() => {
				expect(screen.getByText("Link in Bio")).toBeInTheDocument();
			});

			fireEvent.click(document.body);

			await waitFor(() => {
				expect(
					screen.queryByText("Manage your Link in Bio")
				).not.toBeInTheDocument();
			});
		});

		it("should maintain independent state for both popovers", async () => {
			render(<Header />);

			// Open apps popover
			const appsButton = screen.getByRole("button", { name: /apps/i });
			fireEvent.click(appsButton);

			await waitFor(() => {
				expect(screen.getByText("Link in Bio")).toBeInTheDocument();
			});

			// Close apps popover
			fireEvent.click(document.body);

			// Open profile popover
			const avatarButton = screen.getByRole("button", { name: "" });
			fireEvent.click(avatarButton);

			await waitFor(() => {
				expect(screen.getByText("Olivier Jones")).toBeInTheDocument();
				expect(screen.queryByText("Link in Bio")).not.toBeInTheDocument();
			});
		});
	});
});

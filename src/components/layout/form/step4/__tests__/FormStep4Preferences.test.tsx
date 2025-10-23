import { render, screen, fireEvent } from "@testing-library/react";
import { FormStep4Preferences } from "../FormStep4Preferences";
import { usePreferencesForm } from "../../../../../hooks/usePreferencesForm";

jest.mock("../../../../../hooks/usePreferencesForm", () => ({
  usePreferencesForm: jest.fn(),
}));

jest.mock("../../../../ui/NotificationSection", () => ({
  NotificationSection: ({ notifications }: any) => (
    <div data-testid="notification-section">
      {notifications?.length ? "Notifications Loaded" : "No Notifications"}
    </div>
  ),
}));

jest.mock("../../../../ui/ThemeSection", () => ({
  ThemeSection: ({ currentTheme }: any) => (
    <div data-testid="theme-section">Theme: {currentTheme}</div>
  ),
}));

jest.mock("../../../../ui/InterestsSection", () => ({
  InterestsSection: ({ interests }: any) => (
    <div data-testid="interests-section">
      Interests: {interests?.join(", ") || "None"}
    </div>
  ),
}));

jest.mock("../../../../ui/PreferencesNavigation", () => ({
  PreferencesNavigation: ({ onBack, onSubmit, isValid }: any) => (
    <div data-testid="preferences-navigation">
      <button onClick={onBack}>Back</button>
      <button onClick={onSubmit} disabled={!isValid}>
        Next
      </button>
    </div>
  ),
}));

describe("FormStep4Preferences Component", () => {
  const mockOnNext = jest.fn();
  const mockOnBack = jest.fn();
  const mockSubmit = jest.fn();

  const mockHandleSubmit = (fn: any) => (e?: any) => {
    e?.preventDefault?.();
    fn();
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (usePreferencesForm as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: mockHandleSubmit,
      theme: "dark",
      interests: ["music", "sports"],
      notifications: ["email", "sms"],
      errors: {},
      isValid: true,
      onSubmit: mockSubmit,
    });
  });

  it("renders all sections and title correctly", () => {
    render(<FormStep4Preferences onNext={mockOnNext} onBack={mockOnBack} />);

    expect(
      screen.getByRole("heading", { name: /Preferências/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Personalize sua experiência/i),
    ).toBeInTheDocument();

    expect(screen.getByTestId("notification-section")).toHaveTextContent(
      "Notifications Loaded",
    );
    expect(screen.getByTestId("theme-section")).toHaveTextContent(
      "Theme: dark",
    );
    expect(screen.getByTestId("interests-section")).toHaveTextContent(
      "music, sports",
    );
  });

  it("calls onBack when Back button is clicked", () => {
    render(<FormStep4Preferences onNext={mockOnNext} onBack={mockOnBack} />);

    const backButton = screen.getByText("Back");
    fireEvent.click(backButton);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it("calls onSubmit when Next button is clicked and isValid = true", () => {
    render(<FormStep4Preferences onNext={mockOnNext} onBack={mockOnBack} />);

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  it("disables Next button when form is invalid (isValid = false)", () => {
    (usePreferencesForm as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: mockHandleSubmit,
      theme: "light",
      interests: [],
      notifications: [],
      errors: { theme: { message: "Theme is required" } },
      isValid: false,
      onSubmit: mockSubmit,
    });

    render(<FormStep4Preferences onNext={mockOnNext} onBack={mockOnBack} />);

    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });

  it("renders correctly when no notifications or interests exist", () => {
    (usePreferencesForm as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: mockHandleSubmit,
      theme: "light",
      interests: [],
      notifications: [],
      errors: {},
      isValid: true,
      onSubmit: mockSubmit,
    });

    render(<FormStep4Preferences onNext={mockOnNext} onBack={mockOnBack} />);

    expect(screen.getByTestId("notification-section")).toHaveTextContent(
      "No Notifications",
    );
    expect(screen.getByTestId("interests-section")).toHaveTextContent("None");
  });
});

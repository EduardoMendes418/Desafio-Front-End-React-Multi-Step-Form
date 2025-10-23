import { render, screen, fireEvent } from "@testing-library/react";
import { FormStep5Review } from "../FormStep5Review";
import { useReviewForm } from "../../../../../hooks/useReviewForm";


jest.mock("../../../../../hooks/useReviewForm", () => ({
  useReviewForm: jest.fn(),
}));

jest.mock("../../../../../utils/reviewFormatters", () => ({
  formatPersonalData: jest.fn().mockReturnValue([{ label: "Name", value: "John Doe" }]),
  formatAddressData: jest.fn().mockReturnValue([{ label: "City", value: "New York" }]),
  formatAccountData: jest.fn().mockReturnValue([{ label: "Username", value: "johnny" }]),
  formatPreferencesData: jest.fn().mockReturnValue([{ label: "Theme", value: "Dark" }]),
}));

jest.mock("../../../../ui/ReviewSection.tsx", () => ({
  ReviewSection: ({ title, step, fields, onEdit }: any) => (
    <div data-testid={`section-${step}`}>
      <h3>{title}</h3>
      {fields.map((f: any, i: number) => (
        <p key={i}>
          {f.label}: {f.value}
        </p>
      ))}
      <button onClick={() => onEdit(step)}>Edit</button>
    </div>
  ),
}));

jest.mock("../../../../ui/ReviewNavigation", () => ({
  ReviewNavigation: ({ onBack, onSubmit, isSubmitting }: any) => (
    <div>
      <button onClick={onBack}>Back</button>
      <button onClick={onSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Confirm"}
      </button>
    </div>
  ),
}));

jest.mock("../../toast/Toast", () => ({
  Toast: ({ message, type, isVisible, onClose }: any) =>
    isVisible ? (
      <div role="alert">
        <p>{type}: {message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
}));

describe("FormStep5Review", () => {
  const mockOnBack = jest.fn();
  const mockOnEdit = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockCloseToast = jest.fn();

  const mockUseReviewForm = (overrides = {}) => {
    (useReviewForm as jest.Mock).mockReturnValue({
      formData: {
        personal: { name: "John" },
        address: { city: "New York" },
        account: { username: "johnny" },
        preferences: { theme: "dark" },
      },
      isSubmitting: false,
      toast: { message: "", type: "", isVisible: false },
      handleSubmit: mockHandleSubmit,
      closeToast: mockCloseToast,
      ...overrides,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all review sections with correct titles", () => {
    mockUseReviewForm();

    render(<FormStep5Review onBack={mockOnBack} onEdit={mockOnEdit} />);

    expect(screen.getByText("Revisão e Confirmação")).toBeInTheDocument();
    expect(screen.getByText("Revise suas informações antes de confirmar o cadastro")).toBeInTheDocument();

    expect(screen.getByText("Informações Pessoais")).toBeInTheDocument();
    expect(screen.getByText("Endereço")).toBeInTheDocument();
    expect(screen.getByText("Conta")).toBeInTheDocument();
    expect(screen.getByText("Preferências")).toBeInTheDocument();
  });

  it("calls onBack when Back button is clicked", () => {
    mockUseReviewForm();

    render(<FormStep5Review onBack={mockOnBack} onEdit={mockOnEdit} />);
    fireEvent.click(screen.getByText("Back"));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it("calls handleSubmit when Confirm is clicked", () => {
    mockUseReviewForm();

    render(<FormStep5Review onBack={mockOnBack} onEdit={mockOnEdit} />);
    fireEvent.click(screen.getByText("Confirm"));
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it("disables Confirm button while submitting", () => {
    mockUseReviewForm({ isSubmitting: true });

    render(<FormStep5Review onBack={mockOnBack} onEdit={mockOnEdit} />);
    const button = screen.getByText("Submitting...");
    expect(button).toBeDisabled();
  });

  it("calls onEdit with correct step number", () => {
    mockUseReviewForm();

    render(<FormStep5Review onBack={mockOnBack} onEdit={mockOnEdit} />);
    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[2]); 
    expect(mockOnEdit).toHaveBeenCalledWith(3);
  });

  it("shows toast when visible and allows closing it", () => {
    mockUseReviewForm({
      toast: { message: "Saved successfully", type: "success", isVisible: true },
    });

    render(<FormStep5Review onBack={mockOnBack} onEdit={mockOnEdit} />);
    expect(screen.getByRole("alert")).toHaveTextContent("success: Saved successfully");

    fireEvent.click(screen.getByText("Close"));
    expect(mockCloseToast).toHaveBeenCalledTimes(1);
  });
});

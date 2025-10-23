import { render, screen, fireEvent } from "@testing-library/react";
import { FormStep3Account } from "../FormStep3Account";
import { useAccountForm } from "../../../../../hooks/useAccountForm";

jest.mock("../../../../../hooks/useAccountForm", () => ({
  useAccountForm: jest.fn(),
}));

jest.mock("../../../../ui/PasswordStrengthMeter", () => ({
  PasswordStrengthMeter: ({ passwordStrength }: any) => (
    <div data-testid="password-strength-meter">
      Strength: {passwordStrength.strength}
    </div>
  ),
}));

jest.mock("../../../../ui/PlanSelector.tsx", () => ({
  PlanSelector: ({ plans, selectedPlan, onPlanSelect, loading }: any) => (
    <div data-testid="plan-selector">
      {loading ? (
        <p>Carregando...</p>
      ) : (
        plans.map((p: any) => (
          <div
            key={p.id}
            data-testid={`plan-${p.id}`}
            onClick={() => onPlanSelect(p)}
            style={{
              fontWeight: selectedPlan?.id === p.id ? "bold" : "normal",
            }}
          >
            {p.name} - R$ {p.price}
          </div>
        ))
      )}
    </div>
  ),
}));

describe("FormStep3Account", () => {
  const mockOnNext = jest.fn();
  const mockOnBack = jest.fn();
  const mockHandlePlanSelect = jest.fn();
  const mockSubmit = jest.fn();

  const mockHandleSubmit = (fn: any) => (e?: any) => {
    e?.preventDefault?.();
    fn();
  };

  const baseHookReturn = {
    register: jest.fn().mockReturnValue({}),
    handleSubmit: mockHandleSubmit,
    errors: {},
    isSubmitting: false,
    plans: [
      { id: 1, name: "Básico", price: 10, features: ["1 usuário"] },
      { id: 2, name: "Premium", price: 30, features: ["Usuários ilimitados"] },
    ],
    loading: false,
    selectedPlan: null,
    passwordStrength: { strength: 0 },
    handlePlanSelect: mockHandlePlanSelect,
    onSubmit: mockSubmit,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAccountForm as jest.Mock).mockReturnValue(baseHookReturn);
  });

  it("executes onBack when clicking Back", () => {
    render(<FormStep3Account onNext={mockOnNext} onBack={mockOnBack} />);
    fireEvent.click(screen.getByRole("button", { name: /voltar/i }));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it("Submit the form correctly by clicking Next", () => {
    render(<FormStep3Account onNext={mockOnNext} onBack={mockOnBack} />);
    fireEvent.click(screen.getByRole("button", { name: /próximo/i }));
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  it("Does NOT render PasswordStrengthMeter when strength = 0", () => {
    (useAccountForm as jest.Mock).mockReturnValue({
      ...baseHookReturn,
      passwordStrength: { strength: 0 },
    });

    render(<FormStep3Account onNext={mockOnNext} onBack={mockOnBack} />);
    expect(
      screen.queryByTestId("password-strength-meter")
    ).not.toBeInTheDocument();
  });

  it("renders PasswordStrengthMeter when strength > 0", () => {
    (useAccountForm as jest.Mock).mockReturnValue({
      ...baseHookReturn,
      passwordStrength: { strength: 3 },
    });

    render(<FormStep3Account onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByTestId("password-strength-meter")).toHaveTextContent(
      "Strength: 3"
    );
  });

  it("renders PlanSelector and plans correctly", () => {
    render(<FormStep3Account onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByTestId("plan-selector")).toBeInTheDocument();
    expect(screen.getByTestId("plan-1")).toHaveTextContent("Básico");
    expect(screen.getByTestId("plan-2")).toHaveTextContent("Premium");
  });

  it("calls handlePlanSelect when clicking on a plan", () => {
    render(<FormStep3Account onNext={mockOnNext} onBack={mockOnBack} />);
    fireEvent.click(screen.getByTestId("plan-2"));
    expect(mockHandlePlanSelect).toHaveBeenCalledWith({
      id: 2,
      name: "Premium",
      price: 30,
      features: ["Usuários ilimitados"],
    });
  });

  it("display loading message when loading = true", () => {
    (useAccountForm as jest.Mock).mockReturnValue({
      ...baseHookReturn,
      loading: true,
    });

    render(<FormStep3Account onNext={mockOnNext} onBack={mockOnBack} />);
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("show error message when errors.plan exists", () => {
    (useAccountForm as jest.Mock).mockReturnValue({
      ...baseHookReturn,
      errors: { plan: { message: "Selecione um plano válido" } },
    });

    render(<FormStep3Account onNext={mockOnNext} onBack={mockOnBack} />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Selecione um plano válido");
  });

  it("renders correctly when a plane is selected", () => {
    (useAccountForm as jest.Mock).mockReturnValue({
      ...baseHookReturn,
      selectedPlan: { id: 1, name: "Básico", price: 10, features: [] },
    });

    render(<FormStep3Account onNext={mockOnNext} onBack={mockOnBack} />);
    const selected = screen.getByTestId("plan-1");
    expect(selected).toHaveStyle("font-weight: bold");
  });
});

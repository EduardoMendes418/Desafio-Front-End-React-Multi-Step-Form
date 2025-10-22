import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FormStep2Address } from "../FormStep2Address";
import { useAddressForm } from "../../../../../hooks/useAddressForm";

jest.mock("../../../../../hooks/useAddressForm");

describe("FormStep2Address", () => {
  const mockOnNext = jest.fn();
  const mockOnBack = jest.fn();

  const mockRegister = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockOnSubmit = jest.fn();
  const mockHandleCEPInputChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockRegister.mockImplementation((name: string) => ({
      name,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn(),
    }));

    mockHandleSubmit.mockImplementation((callback) => (e: React.FormEvent) => {
      e.preventDefault();
      callback();
    });

    (useAddressForm as jest.Mock).mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      errors: {},
      isSubmitting: false,
      handleCEPInputChange: mockHandleCEPInputChange,
      onSubmit: mockOnSubmit,
      watch: jest.fn(),
      setValue: jest.fn(),
      control: {},
      formState: { errors: {} },
    });
  });

  it("deve chamar onBack ao clicar no botão Voltar", () => {
    render(<FormStep2Address onNext={mockOnNext} onBack={mockOnBack} />);

    const backButton = screen.getByRole("button", { name: /voltar/i });
    fireEvent.click(backButton);

    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it("deve submeter o formulário ao clicar em Próximo", async () => {
    const mockSubmitHandler = jest.fn((callback) => (e: React.FormEvent) => {
      e.preventDefault();
      callback();
      mockOnNext();
    });

    (useAddressForm as jest.Mock).mockReturnValue({
      register: mockRegister,
      handleSubmit: mockSubmitHandler,
      errors: {},
      isSubmitting: false,
      handleCEPInputChange: mockHandleCEPInputChange,
      onSubmit: mockOnSubmit,
      watch: jest.fn(),
      setValue: jest.fn(),
      control: {},
      formState: { errors: {} },
    });

    render(<FormStep2Address onNext={mockOnNext} onBack={mockOnBack} />);

    const nextButton = screen.getByRole("button", { name: /próximo/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(mockSubmitHandler).toHaveBeenCalled();
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it("deve exibir mensagens de erro quando houver errors", () => {
    const mockErrors = {
      cep: { message: "CEP é obrigatório" },
      street: { message: "Rua é obrigatória" },
      number: { message: "Número é obrigatório" },
    };

    (useAddressForm as jest.Mock).mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      errors: mockErrors,
      isSubmitting: false,
      handleCEPInputChange: mockHandleCEPInputChange,
      onSubmit: mockOnSubmit,
      watch: jest.fn(),
      setValue: jest.fn(),
      control: {},
      formState: { errors: mockErrors },
    });

    render(<FormStep2Address onNext={mockOnNext} onBack={mockOnBack} />);

    expect(screen.getByText("CEP é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("Rua é obrigatória")).toBeInTheDocument();
    expect(screen.getByText("Número é obrigatório")).toBeInTheDocument();
  });

  it("deve chamar register para todos os campos", () => {
    render(<FormStep2Address onNext={mockOnNext} onBack={mockOnBack} />);

    expect(mockRegister).toHaveBeenCalledWith("cep");
    expect(mockRegister).toHaveBeenCalledWith("street");
    expect(mockRegister).toHaveBeenCalledWith("number");
    expect(mockRegister).toHaveBeenCalledWith("complement");
    expect(mockRegister).toHaveBeenCalledWith("neighborhood");
    expect(mockRegister).toHaveBeenCalledWith("city");
    expect(mockRegister).toHaveBeenCalledWith("state");
  });
});

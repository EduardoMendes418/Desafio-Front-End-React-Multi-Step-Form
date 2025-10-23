import { render, screen } from "@testing-library/react";
import { FormStep1Personal } from "../FormStep1Personal";
import { usePersonalForm } from "../../../../../hooks/usePersonalForm";

jest.mock("../../../../ui/InputField", () => ({
  InputField: jest.fn(({ label, type }) => (
    <div data-testid="input-field">
      <label>{label}</label>
      <input type={type} />
    </div>
  )),
}));

jest.mock("../../../../../hooks/usePersonalForm");

describe("FormStep1Personal", () => {
  const mockHandleSubmit = jest.fn((fn) => fn);
  const mockOnSubmit = jest.fn();
  const mockRegister = jest.fn(() => jest.fn());
  const mockHandleDocumentChange = jest.fn();
  const mockHandlePhoneChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (usePersonalForm as jest.Mock).mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      errors: {},
      handleDocumentChange: mockHandleDocumentChange,
      handlePhoneChange: mockHandlePhoneChange,
      onSubmit: mockOnSubmit,
    });
  });

  const makeSut = () => {
    const onNext = jest.fn();
    render(<FormStep1Personal onNext={onNext} />);
    return { onNext };
  };

  it("should render all form fields", () => {
    makeSut();

    const labels = [
      "Nome Completo",
      "CPF/CNPJ",
      "Email",
      "Telefone",
      "Data de Nascimento",
    ];

    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
    expect(screen.getAllByTestId("input-field")).toHaveLength(5);
  });

  it("should call handleDocumentChange and handlePhoneChange on the correct fields", () => {
    makeSut();
    expect(mockHandleDocumentChange).toBeDefined();
    expect(mockHandlePhoneChange).toBeDefined();
  });

  it("should display the correct title and subtitle", () => {
    makeSut();

    expect(screen.getByText("Informações Pessoais")).toBeInTheDocument();
    expect(
      screen.getByText("Preencha suas informações pessoais básicas"),
    ).toBeInTheDocument();
  });

  it("should display the 'Next' button'", () => {
    makeSut();

    const button = screen.getByRole("button", { name: /Próximo/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });
});

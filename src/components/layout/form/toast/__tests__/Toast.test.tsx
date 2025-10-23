
import { render, screen } from "@testing-library/react";
import { Toast } from "../Toast";
import { useToast } from "../../../../../hooks/useToast";


jest.mock("../../../../../hooks/useToast", () => ({
  useToast: jest.fn(),
}));

jest.mock("../../../../ui/ToastContainer", () => ({
  ToastContainer: ({ children, position, isVisible }: any) => (
    <div data-testid="toast-container" data-position={position} data-visible={isVisible}>
      {children}
    </div>
  ),
}));

jest.mock("../../../../ui/ToastContent", () => ({
  ToastContent: ({ message, type, onClose }: any) => (
    <div data-testid="toast-content">
      <p>{`${type}: ${message}`}</p>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

describe("Toast Component", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders nothing when shouldRender is false", () => {
    (useToast as jest.Mock).mockReturnValue({ shouldRender: false });

    const { container } = render(
      <Toast message="Hidden toast" type="info" isVisible={false} onClose={mockOnClose} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders ToastContainer and ToastContent when shouldRender is true", () => {
    (useToast as jest.Mock).mockReturnValue({ shouldRender: true });

    render(
      <Toast
        message="Success message"
        type="success"
        isVisible={true}
        onClose={mockOnClose}
        duration={5000}
        position="bottom-left"
      />
    );

    const container = screen.getByTestId("toast-container");
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute("data-position", "bottom-left");
    expect(container).toHaveAttribute("data-visible", "true");

    expect(screen.getByTestId("toast-content")).toBeInTheDocument();
    expect(screen.getByText("success: Success message")).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    (useToast as jest.Mock).mockReturnValue({ shouldRender: true });

    render(
      <Toast
        message="Closable toast"
        type="error"
        isVisible={true}
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByText("Close");
    closeButton.click();

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("passes duration and isVisible to useToast", () => {
    const mockUseToast = jest.fn().mockReturnValue({ shouldRender: true });
    (useToast as jest.Mock) = mockUseToast;

    render(
      <Toast
        message="Timer toast"
        type="info"
        isVisible={true}
        onClose={mockOnClose}
        duration={4000}
      />
    );

    expect(mockUseToast).toHaveBeenCalledWith({
      isVisible: true,
      onClose: mockOnClose,
      duration: 4000,
    });
  });

  it("renders with default props when duration and position are not provided", () => {
    (useToast as jest.Mock).mockReturnValue({ shouldRender: true });

    render(
      <Toast
        message="Default props toast"
        type="warning"
        isVisible={true}
        onClose={mockOnClose}
      />
    );

    const container = screen.getByTestId("toast-container");
    expect(container).toHaveAttribute("data-position", "top-right");
    expect(screen.getByText("warning: Default props toast")).toBeInTheDocument();
  });
});

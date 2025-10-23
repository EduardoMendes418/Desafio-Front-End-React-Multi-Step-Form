export interface FormStep5ReviewProps {
  onBack: () => void;
  onEdit: (step: number) => void;
}

export interface ToastState {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
}

export interface SectionData {
  title: string;
  step: number;
  fields: {
    label: string;
    value: string;
  }[];
}

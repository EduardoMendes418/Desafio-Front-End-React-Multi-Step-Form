export interface FormStep1PersonalProps {
  onNext: () => void;
}

export interface FormStep2AddressProps {
  onNext: () => void;
  onBack: () => void;
}

export interface FormStep3AccountProps {
  onNext: () => void;
  onBack: () => void;
}

export interface FormStep4PreferencesProps {
  onNext: () => void;
  onBack: () => void;
}

export interface FormStep5ReviewProps {
  onBack: () => void;
  onEdit: (step: number) => void;
}
export interface PreferencesFormData {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  theme: "light" | "dark";
  interests: string[];
}

export interface FormStep4PreferencesProps {
  onNext: () => void;
  onBack: () => void;
}

export interface PreferencesFormErrors {
  notifications?: {
    email?: string;
    sms?: string;
    push?: string;
  };
  theme?: string;
  interests?: string;
}

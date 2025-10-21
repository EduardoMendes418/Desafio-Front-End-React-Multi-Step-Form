export interface PersonalInfo {
  fullName: string;
  document: string;
  email: string;
  phone: string;
  birthDate: string;
}

export interface AddressInfo {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface AccountInfo {
  username: string;
  password: string;
  confirmPassword: string;
  plan: string;
}

export interface PreferencesInfo {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  theme: 'light' | 'dark';
  interests: string[];
}

export interface FormData {
  personal: PersonalInfo;
  address: AddressInfo;
  account: AccountInfo;
  preferences: PreferencesInfo;
}

export type FormStep = 1 | 2 | 3 | 4 | 5;
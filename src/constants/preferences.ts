export const INTERESTS_OPTIONS = [
  'Tecnologia',
  'Esportes',
  'Música',
  'Arte',
  'Ciência',
  'Viagens',
  'Culinária',
  'Moda',
  'Saúde',
  'Negócios',
] as const;

export const NOTIFICATION_OPTIONS = [
  { key: 'email' as const, label: 'Email' },
  { key: 'sms' as const, label: 'SMS' },
  { key: 'push' as const, label: 'Push Notification' },
] as const;

export const THEME_OPTIONS = [
  { value: 'light' as const, label: 'Claro' },
  { value: 'dark' as const, label: 'Escuro' },
] as const;
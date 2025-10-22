import { FormData } from '../types/form';
import { getPlanName } from '../constants/plans';

export const formatPersonalData = (personal: FormData['personal']) => [
  { label: 'Nome', value: personal.fullName },
  { label: 'CPF/CNPJ', value: personal.document },
  { label: 'Email', value: personal.email },
  { label: 'Telefone', value: personal.phone },
  { label: 'Data de Nascimento', value: personal.birthDate },
];

export const formatAddressData = (address: FormData['address']) => [
  { label: 'CEP', value: address.cep },
  { label: 'Rua', value: address.street },
  { label: 'Número', value: address.number },
  { label: 'Complemento', value: address.complement || 'N/A' },
  { label: 'Bairro', value: address.neighborhood },
  { label: 'Cidade/UF', value: `${address.city}/${address.state}` },
];

export const formatAccountData = (account: FormData['account']) => [
  { label: 'Usuário', value: account.username },
  { label: 'Plano', value: getPlanName(account.plan) },
];

export const formatPreferencesData = (preferences: FormData['preferences']) => {
  const notifications = [
    preferences.notifications.email && 'Email',
    preferences.notifications.sms && 'SMS',
    preferences.notifications.push && 'Push'
  ].filter(Boolean).join(', ') || 'Nenhuma';

  const theme = preferences.theme === 'dark' ? 'Escuro' : 'Claro';
  
  const interests = preferences.interests.length > 0 
    ? preferences.interests.join(', ')
    : 'Nenhum';

  return [
    { label: 'Notificações', value: notifications },
    { label: 'Tema', value: theme },
    { label: 'Interesses', value: interests },
  ];
};
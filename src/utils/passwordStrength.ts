export interface PasswordStrength {
  strength: number;
  label: string;
  color: string;
  requirements: {
    met: boolean;
    label: string;
  }[];
}

export const calculatePasswordStrength = (password: string): PasswordStrength => {
  if (!password) {
    return {
      strength: 0,
      label: '',
      color: '',
      requirements: [
        { met: false, label: 'Mínimo 8 caracteres' },
        { met: false, label: 'Letra minúscula' },
        { met: false, label: 'Letra maiúscula' },
        { met: false, label: 'Número' },
        { met: false, label: 'Caractere especial' },
      ],
    };
  }

  const requirements = [
    { regex: /^.{8,}$/, label: 'Mínimo 8 caracteres' },
    { regex: /[a-z]/, label: 'Letra minúscula' },
    { regex: /[A-Z]/, label: 'Letra maiúscula' },
    { regex: /[0-9]/, label: 'Número' },
    { regex: /[^a-zA-Z0-9]/, label: 'Caractere especial' },
  ];

  const metRequirements = requirements.map(req => ({
    met: req.regex.test(password),
    label: req.label,
  }));

  const strengthCount = metRequirements.filter(req => req.met).length;
  const strengthPercentage = (strengthCount / requirements.length) * 100;

  const strengthLabels = ['Muito Fraca', 'Fraca', 'Média', 'Forte', 'Muito Forte'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  return {
    strength: strengthPercentage,
    label: strengthLabels[strengthCount - 1] || '',
    color: strengthColors[strengthCount - 1] || '',
    requirements: metRequirements,
  };
};
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AccountInfo } from '../types/form';
import { useFormStore } from '../store/formStore';
import { getPlans, Plan } from '../services/mockApi';

const accountSchema = z.object({
  username: z.string()
    .min(3, 'Usuário deve ter pelo menos 3 caracteres')
    .regex(/^[a-zA-Z0-9_]+$/, 'Usuário pode conter apenas letras, números e underscore'),
  password: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(/[0-9]/, 'Senha deve conter pelo menos um número')
    .regex(/[^a-zA-Z0-9]/, 'Senha deve conter pelo menos um caractere especial'),
  confirmPassword: z.string(),
  plan: z.string().min(1, 'Selecione um plano'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
});

interface FormStep3AccountProps {
  onNext: () => void;
  onBack: () => void;
}

export const FormStep3Account: React.FC<FormStep3AccountProps> = ({ onNext, onBack }) => {
  const { formData, updateFormData } = useFormStore();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<AccountInfo>({
    resolver: zodResolver(accountSchema),
    defaultValues: formData.account,
  });

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const plansData = await getPlans();
        setPlans(plansData);
      } catch (error) {
        console.error('Error loading plans:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, []);

  const password = watch('password');

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const labels = ['Muito Fraca', 'Fraca', 'Média', 'Forte', 'Muito Forte'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    
    return {
      strength: (strength / 5) * 100,
      label: labels[strength - 1] || '',
      color: colors[strength - 1] || '',
    };
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit = (data: AccountInfo) => {
    updateFormData('account', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Conta</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome de Usuário</label>
        <input
          type="text"
          {...register('username')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Senha</label>
        <input
          type="password"
          {...register('password')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
        />
        {password && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${passwordStrength.color}`}
                style={{ width: `${passwordStrength.strength}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">{passwordStrength.label}</p>
          </div>
        )}
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
        <input
          type="password"
          {...register('confirmPassword')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Plano</label>
        {loading ? (
          <p className="mt-1 text-sm text-gray-600">Carregando planos...</p>
        ) : (
          <select
            {...register('plan')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
          >
            <option value="">Selecione um plano</option>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} - R$ {plan.price.toFixed(2)}
              </option>
            ))}
          </select>
        )}
        {errors.plan && (
          <p className="mt-1 text-sm text-red-600">{errors.plan.message}</p>
        )}
      </div>

      {!loading && plans.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                watch('plan') === plan.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-blue-500'
              }`}
              onClick={() => setValue('plan', plan.id)}
            >
              <h3 className="font-semibold text-lg">{plan.name}</h3>
              <p className="text-2xl font-bold text-blue-600 my-2">
                R$ {plan.price.toFixed(2)}
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                {plan.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Voltar
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Próximo
        </button>
      </div>
    </form>
  );
};
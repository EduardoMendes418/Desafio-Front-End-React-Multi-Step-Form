import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AddressInfo } from '../types/form';
import { useFormStore } from '../store/formStore';
import { fetchAddressByCEP } from '../services/cepService';

const addressSchema = z.object({
  cep: z.string().min(8, 'CEP inválido'),
  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().min(2, 'Estado é obrigatório'),
});

interface FormStep2AddressProps {
  onNext: () => void;
  onBack: () => void;
}

export const FormStep2Address: React.FC<FormStep2AddressProps> = ({ onNext, onBack }) => {
  const { formData, updateFormData } = useFormStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm<AddressInfo>({
    resolver: zodResolver(addressSchema),
    defaultValues: formData.address,
  });

  const handleCEPChange = async (cep: string) => {
    const cleanedCEP = cep.replace(/\D/g, '');
    
    if (cleanedCEP.length === 8) {
      try {
        const addressData = await fetchAddressByCEP(cleanedCEP);
        
        if (addressData) {
          setValue('street', addressData.logradouro);
          setValue('neighborhood', addressData.bairro);
          setValue('city', addressData.localidade);
          setValue('state', addressData.uf);
          setValue('complement', addressData.complemento);
          
          // Clear errors for auto-filled fields
          clearErrors(['street', 'neighborhood', 'city', 'state']);
        } else {
          setError('cep', { message: 'CEP não encontrado' });
        }
      } catch (error) {
        setError('cep', { message: 'Erro ao buscar CEP' });
      }
    }
  };

  const formatCEP = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.replace(/(\d{5})(\d)/, '$1-$2');
  };

  const onSubmit = (data: AddressInfo) => {
    updateFormData('address', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Endereço</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">CEP</label>
        <input
          type="text"
          {...register('cep')}
          onChange={(e) => {
            const formatted = formatCEP(e.target.value);
            setValue('cep', formatted);
            handleCEPChange(e.target.value);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
        />
        {errors.cep && (
          <p className="mt-1 text-sm text-red-600">{errors.cep.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Rua</label>
          <input
            type="text"
            {...register('street')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
          />
          {errors.street && (
            <p className="mt-1 text-sm text-red-600">{errors.street.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Número</label>
          <input
            type="text"
            {...register('number')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
          />
          {errors.number && (
            <p className="mt-1 text-sm text-red-600">{errors.number.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Complemento</label>
        <input
          type="text"
          {...register('complement')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Bairro</label>
          <input
            type="text"
            {...register('neighborhood')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
          />
          {errors.neighborhood && (
            <p className="mt-1 text-sm text-red-600">{errors.neighborhood.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cidade</label>
          <input
            type="text"
            {...register('city')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Estado</label>
        <input
          type="text"
          {...register('state')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
        />
        {errors.state && (
          <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
        )}
      </div>

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
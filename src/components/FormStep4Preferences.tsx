import React from 'react';
import { useForm } from 'react-hook-form';
import { PreferencesInfo } from '../types/form';
import { useFormStore } from '../store/formStore';

const interestsOptions = [
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
];

interface FormStep4PreferencesProps {
  onNext: () => void;
  onBack: () => void;
}

export const FormStep4Preferences: React.FC<FormStep4PreferencesProps> = ({ onNext, onBack }) => {
  const { formData, updateFormData } = useFormStore();
  
  const {
    register,
    handleSubmit,
    watch,
  } = useForm<PreferencesInfo>({
    defaultValues: formData.preferences,
  });

  const theme = watch('theme');

  const onSubmit = (data: PreferencesInfo) => {
    updateFormData('preferences', data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Preferências</h2>
      
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">Notificações</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register('notifications.email')}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Email</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register('notifications.sms')}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">SMS</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register('notifications.push')}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Push Notification</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">Tema</h3>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="light"
              {...register('theme')}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Claro</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="dark"
              {...register('theme')}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Escuro</span>
          </label>
        </div>
        
        {/* Theme Preview */}
        <div className={`mt-4 p-4 rounded-lg border ${
          theme === 'dark' 
            ? 'bg-gray-800 text-white border-gray-700' 
            : 'bg-white text-gray-800 border-gray-300'
        }`}>
          <p>Preview do tema selecionado</p>
          <div className={`mt-2 p-2 rounded ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            Exemplo de card
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">Interesses</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {interestsOptions.map((interest) => (
            <label key={interest} className="flex items-center">
              <input
                type="checkbox"
                value={interest}
                {...register('interests')}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">{interest}</span>
            </label>
          ))}
        </div>
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
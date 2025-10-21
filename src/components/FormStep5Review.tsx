import React, { useState } from 'react';
import { useFormStore } from '../store/formStore';
import { submitForm } from '../services/mockApi';
import { Toast } from './Toast';

interface FormStep5ReviewProps {
  onBack: () => void;
  onEdit: (step: number) => void;
}

export const FormStep5Review: React.FC<FormStep5ReviewProps> = ({ onBack, onEdit }) => {
  const { formData, submitForm: submitStoreForm, resetForm } = useFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await submitForm(formData);
      
      setToast({
        message: result.message,
        type: result.success ? 'success' : 'error',
        isVisible: true
      });

      if (result.success) {
        submitStoreForm();
        setTimeout(() => {
          resetForm();
        }, 2000);
      }
    } catch (error) {
      setToast({
        message: 'Erro ao enviar formulário',
        type: 'error',
        isVisible: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPlanName = (planId: string) => {
    const plans = {
      basic: 'Básico',
      pro: 'Profissional',
      enterprise: 'Empresarial'
    };
    return plans[planId as keyof typeof plans] || planId;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Revisão e Confirmação</h2>
      
      <div className="space-y-6">
        {/* Informações Pessoais */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Informações Pessoais</h3>
            <button
              onClick={() => onEdit(1)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Editar
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Nome:</span> {formData.personal.fullName}
            </div>
            <div>
              <span className="font-medium">CPF/CNPJ:</span> {formData.personal.document}
            </div>
            <div>
              <span className="font-medium">Email:</span> {formData.personal.email}
            </div>
            <div>
              <span className="font-medium">Telefone:</span> {formData.personal.phone}
            </div>
            <div>
              <span className="font-medium">Data Nasc.:</span> {formData.personal.birthDate}
            </div>
          </div>
        </div>

        {/* Endereço */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Endereço</h3>
            <button
              onClick={() => onEdit(2)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Editar
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">CEP:</span> {formData.address.cep}
            </div>
            <div>
              <span className="font-medium">Rua:</span> {formData.address.street}
            </div>
            <div>
              <span className="font-medium">Número:</span> {formData.address.number}
            </div>
            <div>
              <span className="font-medium">Complemento:</span> {formData.address.complement || 'N/A'}
            </div>
            <div>
              <span className="font-medium">Bairro:</span> {formData.address.neighborhood}
            </div>
            <div>
              <span className="font-medium">Cidade/UF:</span> {formData.address.city}/{formData.address.state}
            </div>
          </div>
        </div>

        {/* Conta */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Conta</h3>
            <button
              onClick={() => onEdit(3)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Editar
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Usuário:</span> {formData.account.username}
            </div>
            <div>
              <span className="font-medium">Plano:</span> {getPlanName(formData.account.plan)}
            </div>
          </div>
        </div>

        {/* Preferências */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Preferências</h3>
            <button
              onClick={() => onEdit(4)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Editar
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Notificações:</span>{' '}
              {[
                formData.preferences.notifications.email && 'Email',
                formData.preferences.notifications.sms && 'SMS',
                formData.preferences.notifications.push && 'Push'
              ].filter(Boolean).join(', ') || 'Nenhuma'}
            </div>
            <div>
              <span className="font-medium">Tema:</span> {formData.preferences.theme === 'dark' ? 'Escuro' : 'Claro'}
            </div>
            <div>
              <span className="font-medium">Interesses:</span>{' '}
              {formData.preferences.interests.length > 0 
                ? formData.preferences.interests.join(', ')
                : 'Nenhum'
              }
            </div>
          </div>
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
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Enviando...' : 'Confirmar Cadastro'}
        </button>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
};
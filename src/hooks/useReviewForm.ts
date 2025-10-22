import { useState } from 'react';
import { useFormStore } from '../store/formStore';
import { submitForm } from '../services/mockApi';
import { ToastState } from '../types/review';

export const useReviewForm = () => {
  const { formData, submitForm: submitStoreForm, resetForm } = useFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'success',
    isVisible: false
  });

  const handleSubmit = async (): Promise<boolean> => {
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
        return true;
      }
      return false;
    } catch (error) {
      setToast({
        message: 'Erro ao enviar formulário. Tente novamente.',
        type: 'error',
        isVisible: true
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return {
    formData,
    isSubmitting,
    toast,
    handleSubmit,
    closeToast,
  };
};
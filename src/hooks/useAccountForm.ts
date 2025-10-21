import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStore } from '../store/formStore';
import { getPlans, Plan } from '../services/mockApi';
import { accountSchema, AccountFormData } from '../schemas/accountSchema';
import { calculatePasswordStrength } from '../utils/passwordStrength';

export const useAccountForm = (onNext: () => void, onBack: () => void) => {
  const { formData, updateFormData } = useFormStore();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  const methods = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: formData.account,
    mode: 'onBlur',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    trigger,
  } = methods;

  const password = watch('password');
  const selectedPlan = watch('plan');
  const passwordStrength = calculatePasswordStrength(password);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const plansData = await getPlans();
        setPlans(plansData);
      } catch (error) {
        console.error('Error loading plans:', error);
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, []);

  const handlePlanSelect = async (planId: string) => {
    setValue('plan', planId);
    await trigger('plan');
  };

  const onSubmit = (data: AccountFormData) => {
    updateFormData('account', data);
    onNext();
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    plans,
    loading,
    selectedPlan,
    passwordStrength,
    handlePlanSelect,
    onSubmit,
    onBack,
  };
};
import { useFormStore } from './store/formStore';
import { FormStep5Review } from './components/layout/form/step5/FormStep5Review';
import { FormStep1Personal } from './components/layout/form/step1/FormStep1Personal';
import { FormStep2Address } from './components/layout/form/step2/FormStep2Address';
import { FormStep3Account } from './components/layout/form/step3/FormStep3Account';
import { FormStep4Preferences } from './components/layout/form/step4/FormStep4Preferences';
import { StepProgressBar } from './components/layout/form/progress/StepProgressBar';

const steps = [
  { number: 1, label: 'Pessoal' },
  { number: 2, label: 'Endereço' },
  { number: 3, label: 'Conta' },
  { number: 4, label: 'Preferências' },
  { number: 5, label: 'Revisão' },
];

function App() {
  const { currentStep, setCurrentStep, goToStep } = useFormStore();

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((currentStep + 1) as any);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as any);
    }
  };

  const handleEditStep = (step: number) => {
    goToStep(step as any);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <FormStep1Personal onNext={handleNext} />;
      case 2:
        return <FormStep2Address onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <FormStep3Account onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <FormStep4Preferences onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <FormStep5Review onBack={handleBack} onEdit={handleEditStep} />;
      default:
        return <FormStep1Personal onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Cadastro Multi-Etapas</h1>
            <p className="text-gray-600 mt-2">Complete seu cadastro em poucos passos</p>
          </div>

          <StepProgressBar currentStep={currentStep} steps={steps} />
          
          <div className="mt-8">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
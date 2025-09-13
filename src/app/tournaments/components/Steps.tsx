import { Fragment } from 'react';
import Step from './Step';

interface StepsProps {
  currentStep: number;
}

const Steps: React.FC<StepsProps> = ({ currentStep }) => {
  const steps = [
    { stepNumber: 1, label: 'Canjea' },
    { stepNumber: 2, label: 'Yapea' },
  ];

  return (
    <div className="w-full flex items-center">
      {steps.map((step, index) => (
        <Fragment key={index}>
          <Step
            stepNumber={step.stepNumber}
            label={step.label}
            isActive={step.stepNumber === currentStep}
            isCompleted={step.stepNumber < currentStep}
          />
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-px mx-1 md:mx-2 mb-4 md:mb-6 ${
                currentStep > index + 1 ? 'bg-red-color-1' : 'bg-gray-color-5'
              }`}
            ></div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default Steps;

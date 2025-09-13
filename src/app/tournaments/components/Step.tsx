interface StepProps {
  stepNumber: number;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
}

const Step: React.FC<StepProps> = ({
  stepNumber,
  label,
  isActive,
  isCompleted,
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-1 md:gap-3">
      <div
        className={`flex items-center justify-center w-8 md:w-10 h-8 md:h-10 rounded-full text-white border ${
          isCompleted
            ? 'bg-red-color-1 border-red-color-1'
            : isActive
              ? 'border-red-color-1'
              : 'border-gray-color-5'
        }`}
      >
        {isCompleted ? (
          <span className="text-white">✔</span>
        ) : (
          <span className="text-sm md:text-base">{stepNumber}</span>
        )}
      </div>
      <span className="text-xs md:text-sm">{label}</span>
    </div>
  );
};

export default Step;

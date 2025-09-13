interface ITextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  onChange?: (value: string, isValid: boolean) => void;
}

const Textarea = ({
  name,
  label = '',
  placeholder = '',
  onChange = () => {},
}: ITextareaProps) => {
  const handleChangeTextareaValue = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;

    onChange(value, value.length > 0);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && label.length > 0 ? (
        <label className="text-sm font-light">{label}</label>
      ) : (
        <></>
      )}
      <textarea
        className="textarea bg-transparent h-[100px] text-white p-[8px] border border-gray-color-2 transition-regular focus:border-white rounded-lg resize-none"
        name={name}
        placeholder={placeholder}
        onChange={handleChangeTextareaValue}
      />
    </div>
  );
};

export default Textarea;

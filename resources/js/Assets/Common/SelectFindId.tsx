import { useState } from "react";

interface Option {
  id: number | string;
  value: string;
  label: string;
}

interface SelectFindIdProps {
  options: Option[];
  placeholder?: string;
  onChange: (option: Option) => void; 
  className?: string;
  defaultValue?: string;
}

const SelectFindId: React.FC<SelectFindIdProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    const selectedOption = options.find(option => String(option.id) === value);
    if (selectedOption) {
      onChange(selectedOption); 
    }
  };

  return (
    <select
      className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
        selectedValue
          ? "text-gray-800 dark:text-white/90"
          : "text-gray-400 dark:text-gray-400"
      } ${className}`}
      value={selectedValue}
      onChange={handleChange}
    >
      <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value="" disabled>{placeholder}</option>
      {options.map(option => (
        <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" key={option.id} value={option.id}>{option.label}</option>
      ))}
    </select>
  );
};

export default SelectFindId;

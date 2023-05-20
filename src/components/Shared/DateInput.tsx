import { ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

interface DateInputProps {
  label: string | boolean;
  modelValue: string;
  error: boolean;
  errorMessage?: string;
  onUpdateModelValue: (value: string) => void;
}


const DateInput = ({
  label,
  modelValue,
  error,
  errorMessage,
  onUpdateModelValue,
}: DateInputProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUpdateModelValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2 items-start">
           {label && (
        <label
          className={`text-sm font-bold ${error ? 'text-red-600' : 'text-gray-600'}`}
        >
          {label}
        </label>
      )}

      <div className="w-full relative h-max">
        <input
          type="date"
          value={modelValue}
          onChange={handleInputChange}
          id="dateInput"
          className="w-full px-6 md:px-12 py-2 border border-slate-400 rounded-lg text-slate-700 font-semibold text-sm focus:border-blue-500 focus:border focus:outline-none appearance-none"
        />

        <FontAwesomeIcon
          icon={faCalendar}
          className="absolute left-2 md:left-4 top-0 bottom-0 my-auto text-slate-700 text-sm md:text-lg"
        />
      </div>

      {error && (
        <small className="text-xs text-red-600">{errorMessage}</small>
      )}
    </div>
  );
};

export default DateInput;


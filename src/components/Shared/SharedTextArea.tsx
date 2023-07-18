import { useEffect, useState } from "react";

const SharedTextArea = ({ label, modelValue, onChange, error, errorMessage, rows, maxChars }:any) => {

    const [contentError, setContentError] = useState(false);
    const [remain, setRemain] = useState(0);
  
    useEffect(() => {
      setRemain(maxChars);
    }, []);
  
    const countRemain = (event:any) => {
      const len = event.target.value.length;
      setRemain(maxChars - len);
      if (remain < 0) return setContentError(true);
      setContentError(false);
    };
    return ( 
        <div className="flex flex-col gap-2 items-start">
      {label && (
        <label
          className={`text-sm font-semibold ${error ? 'text-red-600' : 'text-gray-600'}`}
          
        >
          {label}
        </label>
      )}

      <div className={`w-full relative h-max`}>
        <textarea
          value={modelValue}
          onChange={(event) => onChange(event.target.value)}
          className={`w-full px-6 py-2 border ${error || contentError ? 'border-red-600' : 'border-slate-400'} text-gray-600 text-sm font-semibold focus:outline-none`}
          rows={rows}
          onKeyUp={countRemain}
        />

        <p
          className={`absolute bottom-4 right-2 text-sm font-bold ${contentError ? 'text-red-600' : 'text-gray-500'}`}
        >
          {remain}
        </p>
      </div>

      {error && (
        <small className="text-xs text-red-600">{errorMessage}</small>
      )}
    </div>
     );
}
 
export default SharedTextArea;
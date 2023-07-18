const SharedRadioGroup = ({
    title,
    modelValue = "",
    error ,
    errorMessage,
    vertical,
    options,
    name,
    onUpdateModelValue,
  }:any) => {
    return ( 
        <div className="flex flex-col gap-4 items-start">
        {title && (
          <h4 className={error ? 'text-red-600' : 'text-gray-600'}>{title}</h4>
        )}
  
        <div className={`flex gap-6 ${vertical ? 'flex-col' : 'flex-row'}`} >
          {options.map((option:any, index:number) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="radio"
                id={option.data}
                name={name}
                value={option.data}
                onChange={(e) => onUpdateModelValue(e.target.value)}
                className="w-4 h-4 cursor-pointer"
              />
              <label htmlFor={option.data} className="text-gray-600 text-sm h-max w-max font-semibold">
                {option.label}
              </label>
            </div>
          ))}
        </div>
  
        {error && (
          <small className="text-xs text-red-600">
            {errorMessage}
          </small>
        )}
      </div>
     );
}
 
export default SharedRadioGroup;
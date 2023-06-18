import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';


const SharedTextInput = ({
    label,
    modelValue,
    error,
    errorMessage,
    editMode,
    onEditClick,
    onUpdateModelValue,
    ...attrs
}: any) => {

    const handleClick = () => {
        onEditClick();
      };
    return (
        <div className="flex flex-col gap-2 items-start">
            {label && (
                <div className="flex items-center gap-4">
                    <label
                        className={error ? "text-red-600" : "text-gray-600"}
                        htmlFor={attrs.id}
                    >
                        {label}
                    </label>

                    {editMode && (
                        <button onClick={handleClick}>
                            <FontAwesomeIcon
                                icon={faPenToSquare}
                                className="text-blue-600 text-sm"
                            />
                        </button>
                    )}
                </div>
            )}

            <input
                type="text"
                value={modelValue}
                onChange={(e) => onUpdateModelValue(e.target.value)}
                className={error ? "border-red-600" : "border-slate-400"}
                {...attrs}
            />

            {error && <small className="text-xs text-red-600">{errorMessage}</small>}
        </div>
    );
};

export default SharedTextInput;

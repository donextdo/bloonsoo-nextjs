const FormCard = ({ label, children }:any) => {
    return ( 
        <div className="bg-gray-100 rounded-md w-[90vw] md:w-full flex flex-col gap-6 py-8 px-6 font-montserrat">
        {label && (
          <h4 className="text-base md:text-lg text-gray-600 font-semibold">
            {label}
          </h4>
        )}
        {children}
      </div>
     );
}
 
export default FormCard;
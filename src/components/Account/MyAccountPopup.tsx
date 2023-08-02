const MyAccountPopup = ({ setSelected, selected, setModal, setIsColor, isColor,}:any) => {
    const handleClick = (id: any) => {
        setSelected(id);
        setModal(false);
        setIsColor(id);
      };
    return ( 
        <div>
        <button
          className={`border-t border-r border-l border-gray-300 w-full py-4 text-left pl-4 text-sm ${
            isColor === 1 ? "bg-[#233a95] text-white" : "bg-white text-black"
          }`}
          onClick={() => handleClick(1)}
        >
          DASHBOARD
        </button>
        <button
          className={`border-t border-r border-l border-gray-300 w-full py-4 text-left pl-4 text-sm ${
            isColor === 2 ? "bg-[#233a95] text-white" : "bg-white text-black"
          }`}
          onClick={() => handleClick(2)}
        >
          ORDERS
        </button>
        <button
          className={`border-t border-r border-l border-gray-300 w-full py-4 text-left pl-4 text-sm ${
            isColor === 3 ? "bg-[#233a95] text-white" : "bg-white text-black"
          }`}
          onClick={() => handleClick(3)}
        >
          ACCOUNT DETAILS
        </button>
        {/* <button
          className={`border border-gray-300 w-full py-4 text-left pl-4 text-sm ${
            isColor === 4 ? "bg-[#233a95] text-white" : "bg-white text-black"
          }`}
          onClick={() => handleClick(4)}
        >
          CHANGE PASSWORD
        </button> */}
        <button
          className={`border border-gray-300 w-full py-4 text-left pl-4 text-sm ${
            isColor === 5 ? "bg-[#233a95] text-white" : "bg-white text-black"
          }`}
          onClick={() => handleClick(5)}
        >
          ADMIN
        </button>
      </div>
     );
}
 
export default MyAccountPopup;
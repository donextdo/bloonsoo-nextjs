import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";

const PriceCard = () => {
  const totalPrice = useSelector((state: RootState) => state.booking.totalAmount);

    return ( 
        <div className="shadow-md rounded-lg bg-white w-full px-5 py-8">

        <div className="grid grid-cols-2 gap-2 border-b-2 border-gray-200 pb-6 mb-5">
            <div>
                <p className="font-semibold text-base md:text-lg text-gray-700">Price</p>
                 {/* <p className="text-gray-500 text-sm">( your currency )</p>  */}
            </div>
            <div>
                <p className="font-semibold text-base md:text-lg text-gray-700 float-right">{ totalPrice }</p>
            </div>
        </div>

        <div className="border-b-2 border-gray-200 pb-6 mb-5">
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-medium text-sm md:text-base">Property&apos;s Currency</p>
                        
                </div>

                <div>
                    <p className="font-medium text-sm md:text-base">{ totalPrice }</p>
                </div>

            </div>

             {/* <p className="text-gray-500 text-sm">in USS ( for 2 nights & all guests ) </p>  */}

        </div>

        <p className="text-gray-500 mb-4 text-sm md:text-base">*This price is converted to show you the approximate cost in LKR. You&apos;ll pay in USS or LKR. The exchange rate might change before you pay. </p>

        <p className="text-gray-500 text-sm md:text-base">Keep in mind that your card issuer may charge you a foreign transaction fee. </p>
    
    </div>
     );
}
 
export default PriceCard;
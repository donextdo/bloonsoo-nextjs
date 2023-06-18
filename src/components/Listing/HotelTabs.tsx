const HotelTabs = ({ active_1, active_2, active_3, active_4, active_5, active_6 }: any) => {
    return (
        <div className="md:container mx-auto flex gap-2 items-center justify-center mb-4">
            <button
                className={`w-44 h-16 border-b-8 flex justify-center items-start pt-2 ${active_1 ? 'border-blue-500' : 'border-gray-200'
                    }`}
                // onClick={() => handleClick('active_1')}
            >
                <span className="text-gray-500 text-sm font-semibold text-center">
                    Basic Information
                </span>
            </button>

            <button
                className={`w-44 h-16 border-b-8 flex justify-center items-start pt-2 ${active_2 ? 'border-blue-500' : 'border-gray-200'
                    }`}
                // onClick={() => handleClick('active_2')}
            >
                <span className="text-gray-500 text-sm font-semibold text-center">
                    Layout and <br /> pricing
                </span>
            </button>

            <button
                className={`w-44 h-16 border-b-8 flex justify-center items-start pt-2 ${active_3 ? 'border-blue-500' : 'border-gray-200'
                    }`}
                // onClick={() => handleClick('active_3')}
            >
                <span className="text-gray-500 text-sm font-semibold text-center">
                    Facilities and <br /> Amenities
                </span>
            </button>

            <button
                className={`w-44 h-16 border-b-8 flex justify-center items-start pt-2 ${active_4 ? 'border-blue-500' : 'border-gray-200'
                    }`}
                // onClick={() => handleClick('active_4')}
            >
                <span className="text-gray-500 text-sm font-semibold text-center">
                    Images
                </span>
            </button>

            <button
                className={`w-44 h-16 border-b-8 flex justify-center items-start pt-2 ${active_5 ? 'border-blue-500' : 'border-gray-200'
                    }`}
                // onClick={() => handleClick('active_5')}
            >
                <span className="text-gray-500 text-sm font-semibold text-center">
                    Policies
                </span>
            </button>

            <button
                className={`w-44 h-16 border-b-8 flex justify-center items-start pt-2 ${active_6 ? 'border-blue-500' : 'border-gray-200'
                    }`}
                // onClick={() => handleClick('active_6')}
            >
                <span className="text-gray-500 text-sm font-semibold text-center">
                    Payments
                </span>
            </button>
        </div>
    );
}

export default HotelTabs;
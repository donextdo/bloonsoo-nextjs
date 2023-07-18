const ListingTable = ({ headers }: any) => {
    return (
        <div className="w-full flex flex-col gap-3">
            <div className="w-full bg-blue-700 gap-2 grid grid-cols-12 items-center text-white text-base font-semibold">
                <div className="w-full col-span-4 px-6 h-24 flex items-center">
                    <h3>{headers[0] ? headers[0] : ''}</h3>
                </div>
                <div className="w-full col-span-1 px-6 h-24 flex items-center">
                    <h3>{headers[1] ? headers[1] : ''}</h3>
                </div>
                <div className="w-full col-span-2 px-6 h-24 flex items-center">
                    <h3>{headers[2] ? headers[2] : ''}</h3>
                </div>
                <div className="w-full col-span-2 px-6 h-24 flex items-center">
                    <h3>{headers[3] ? headers[3] : ''}</h3>
                </div>
                <div className="w-full col-span-1 px-6 h-24 flex items-center">
                    <h3>{headers[4] ? headers[4] : ''}</h3>
                </div>
                <div className="w-full col-span-1 px-6 h-24 flex items-center">
                <h3>{headers[5] ? headers[5] : ''}</h3>

                </div>
                <div className="w-full col-span-1 px-6 h-24 flex items-center">
                <h3>{headers[6] ? headers[6] : ''}</h3>

                </div>
            </div>
            <div>
                {/* Render the children components */}
            </div>
        </div>
    );
}

export default ListingTable;
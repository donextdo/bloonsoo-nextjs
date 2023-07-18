const AdditionalInformation = ({hotel}:any) => {
    return (
        <div className="space-y-2">
            {/* <table className="border-collapse border w-full">
                <tbody>
                    {data.additionalInformation.map((item:any, index:any)=>(                    
                    <tr className="border" key={index}>
                        <td className="border px-4 py-2">{item.name}</td>
                        <td className="border px-4 py-2">{item.description}</td>
                    </tr>
                    ))}
                </tbody>
            </table> */}
            <div className="bg-blue-50 p-2 rounded-sm shadow-md">
            Visit Nine Arch Bridge: Explore the iconic Nine Arch Bridge, a marvel of engineering hidden amidst the lush greenery. Watch as trains pass over the bridge, capturing memorable photos and enjoying the scenic surroundings.
            </div>
            <div className="bg-blue-50 p-2 rounded-sm shadow-md">
            Experience Little Adam&apos;s Peak: Trek to Little Adam&apos;s Peak, a relatively easy hike that offers spectacular views of Ella&apos;s landscape. The trek takes around 1-2 hours, and you&apos;ll be rewarded with stunning vistas of tea plantations, valleys, and mountains.
            </div>
        </div>
    );
}

export default AdditionalInformation;
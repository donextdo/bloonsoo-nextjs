import { useEffect, useState } from "react";
import baseUrl from "../../../Utils/baseUrl";
import axios from "axios";
import { useRouter } from "next/router";
import HotelCard from "@/components/Search/HotelCard";

const SearchPage = () => {

    const [hotels, setHotels] = useState([])
    const router = useRouter()
    const { city } = router.query;
    console.log(city)



    useEffect(() => {
        searchHotels();
    }, []);

    const searchHotels = async () => {

        const searchhotel = 
            {
                "query": city
              }
        
        
        try {
            const response = await axios.post(`${baseUrl}/hotel/search`, searchhotel);
            const data = response.data;
            console.log(response.data)
            setHotels(data)


        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section className="md:container mx-auto px-10 py-12 flex flex-col items-center gap-10 text-black font-montserrat">
            <main className=" w-full md:px-32">
                <section className="flex flex-col gap-6 relative">
                    <h1 className="font-bold text-lg md:text-3xl mb-10">{hotels.length} Results Found for "{city}"</h1>

                    {hotels.map((hotel:any, index:number) => (
                        <HotelCard key={index} hotel={hotel} />
                        
                    ))}
                </section>

            </main>

        </section>

    );
}

export default SearchPage;
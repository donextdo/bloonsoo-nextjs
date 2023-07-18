import BasicInfo from "@/components/Listing/BasicInfo";
import HotelTabs from "@/components/Listing/HotelTabs";

const ListingHotel = () => {
    return ( 
        <section className="md:container mx-auto px-10 py-16 flex flex-col gap-8 text-black font-montserrat">
      <h2 className="text-2xl font-semibold mb-6">List your property on Bloonsoo.com</h2>
      <HotelTabs active_1 />
      <BasicInfo />
    </section>
     );
}
 
export default ListingHotel;
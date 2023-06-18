import ListingCard from '@/components/Listing/ListingCard';
import Room from '../../assets/listing/Room.png'
import Flat from '../../assets/listing/Flat.png'
import Hotel from '../../assets/listing/Hotel.png'
import Villa from '../../assets/listing/Villa.png'
import dada from "../../assets/listing/Hotel.png"

const ListingPage = () => {
    return ( 
        <section className="md:container mx-auto px-10 py-16 flex flex-col gap-6 text-black font-montserrat">
        <div>
          <h2 className="text-2xl font-semibold mb-8">
            List your property on Bloonsoo.com
          </h2>
          <p className="text-base text-gray-500 font-normal">
            What kind of place will you host?
          </p>
        </div>
  
        <div className="grid grid-cols-2 gap-4 justify-items-center lg:grid-cols-4 md:gap-8">
           
          <ListingCard title="Room" path="#" image={Room}/>
          <ListingCard title="Flat" path="#" image={Flat}/>
          <ListingCard title="Hotel" path="/listing/hotel" image={Hotel}/>
          <ListingCard title="Villa" path="#" image={Villa}/>

        </div>
      </section>
     );
}
 
export default ListingPage;
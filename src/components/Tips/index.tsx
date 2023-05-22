import Link from 'next/link';
import Card from './Card';
import Image from 'next/image';
import Img1 from '../../assets/tips/image_1.jpg'
import Img2 from '../../assets/tips/image_2.jpg'
import Img3 from '../../assets/tips/image_3.jpg'


const Tips = () => {
  return (
    <section className="px-10 md:px-20 my-16 md:container md:mx-auto flex flex-col items-center font-montserrat">
      <h1 className="text-3xl w-full text-left font-semibold leading-10 mb-12">
        Hotel Reservation Guides & Tips
      </h1>

      <div className="w-full grid md:grid-cols-2 gap-x-4 gap-y-8 justify-items-center lg:grid-cols-3 md:gap-x-8 lg:gap-y-16">
        <Card>
        <Image
            src={Img1}
            width='250' height='250'
            loading="lazy"
            className="w-full h-full object-cover"
            alt=""
          />
        </Card>

          
        

        <Card>
          <Image
            src={Img2}
            width='250' height='250'
            loading="lazy"
            className="w-full h-full object-cover"
            alt=""
          />
          </Card>
        

        <Card>
          <Image
            src={Img3}
            width='250' height='250'
            loading="lazy"
            className="w-full h-full object-cover"
            alt=""
          />
          </Card>
        
      </div>

      
        <Link href='#' className="py-4 px-10 inline-block rounded-full mt-12 w-max text-sm text-black font-bold bg-gradient-to-b from-darkyellow to-semidarkyellow hover:from-semidarkyellow hover:to-darkyellow">
          View All Blogs
        </Link>
    </section>
  );
};

export default Tips;

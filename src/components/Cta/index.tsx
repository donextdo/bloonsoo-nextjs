import { FC, ReactNode } from 'react';
import Card from './Card';
import Image from 'next/image';

interface CtaProps {

  contents: {
    title: string;
    desc: string;
    image: string;
  };
  noCard?: boolean;
  children?: ReactNode;

}

const Cta: FC<CtaProps> = ({ contents, noCard }) => {
  return (
    <section className="relative w-full h-70vh">
      <Image src={contents.image} loading="lazy" className="w-full h-full object-cover" width={500} height={500} alt=""/>
      {!noCard && (
        <Card image={contents}>
        </Card>
      )}
    </section>
  );
};

export default Cta;


// import { FC, ReactNode } from 'react';
// import Card from './Card';

// interface CtaProps {
//   content: {
//     buttonLink: string;
//     buttonText: string;
//   };
//   children: {
//     image: ReactNode;
//     button: ReactNode;
//   };
// }

// const Cta: FC<CtaProps> = ({ content, children }) => {
//   return (
//     <section className="relative w-full h-70vh">
//       {children.image}
//       {!noCard && (
//         <Card image={content}>
//           {children.button}
//         </Card>
//       )}
//     </section>
//   );
// };

// export default Cta;


import { Children, FC, ReactNode } from 'react';
import Card from './Card';
import Image from 'next/image';

interface CtaProps {

  contents: {
    title: string;
    desc: string;
    buttonLink: string;
    buttonText: string;
  };
  noCard?: boolean;
  children?: ReactNode;

}

const Cta: FC<CtaProps> = ({ contents, noCard , children}) => {
  return (
    <section className="relative w-full h-70vh">
      {children}
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


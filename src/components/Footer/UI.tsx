import { ReactNode } from "react";
import Link from "next/link";

interface UIProps {
  data: {
    title: string;
    path: string;
  }[];
}

const UI: React.FC<UIProps> = ({ data }) => {
  return (
    <ul className="text-sm font-normal flex flex-col gap-3">
      {data.map((link, index) => (
        <li key={index}>
          <Link href={link.path}>
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default UI;

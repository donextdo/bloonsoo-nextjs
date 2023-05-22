import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import Img1 from '../../assets/avatar/avatar_2.png'

const Card: React.FC = () => {
  return (
    <div className="w-full h-72 rounded-lg p-6 flex flex-col bg-white shadow-lg">
      <div className="flex items-end gap-4">
        <div className="md:h-20 md:w-20 rounded-full overflow-hidden">
          <Image
            src={Img1}
            loading="lazy"
            className="w-full h-full object-cover"
            alt=""
            width={100}
            height={100}
          />
        </div>

        <div className="flex gap-1 w-max mb-4">
          <FontAwesomeIcon
            icon={solidStar}
            className="text-semidarkyellow text-sm"
          />
          <FontAwesomeIcon
            icon={solidStar}
            className="text-semidarkyellow text-sm"
          />
          <FontAwesomeIcon
            icon={solidStar}
            className="text-semidarkyellow text-sm"
          />
          <FontAwesomeIcon
            icon={solidStar}
            className="text-semidarkyellow text-sm"
          />
          <FontAwesomeIcon
            icon={regularStar}
            className="text-semidarkyellow text-sm"
          />
        </div>
      </div>

      <h4 className="text-lg text-black font-semibold mt-6">Hermoine Granger</h4>

      <p className="text-xs mt-5 max-w-sm text-gray-500 lg:text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco
      </p>
    </div>
  );
};

export default Card;

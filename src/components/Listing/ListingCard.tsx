import Image from "next/image";
import Link from "next/link";

const ListingCard = ({ title, path, image }: any) => {
    return (
        <div className="w-full h-72 bg-white shadow-lg shadow-gray-400 lg:h-80 rounded-lg p-3 flex flex-col justify-between">
            <div className="w-full h-2/5">
                  <Image
                                            src={image}
                                            alt="item1"
                                            style={{
                                                objectFit: "contain",
                                                backgroundColor: "white",
                                                width: "100%",
                                                height: "100%",
                                            }}
                                            width={450}
                                            height={400}
                                        />
            </div>

            <div className="flex flex-col items-center gap-2">
                <h3 className="text-base text-center font-bold text-gray-800">
                    {title}
                </h3>

                <span className="text-sm text-center text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                </span>

                <Link href={path} className="py-2 px-6 my-2 lg:my-0 xl:my-4 xl:py-3 rounded-lg text-xs xl:text-sm text-white font-semibold bg-blue-700 hover:bg-blue-900">
                    List Your Property
                </Link>
            </div>
        </div>
    );
}

export default ListingCard;
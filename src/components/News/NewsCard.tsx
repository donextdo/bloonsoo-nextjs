import Image from "next/image";
import Link from "next/link";

const NewsCard = ({ item }: any) => {
    const dateString = item.expiredDate;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    return (
        <div className="space-y-4">
            <div className="h-[200px] w-full rounded-md">
                <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover h-full w-full bg-gray-500 rounded-md"
                />
            </div>
            <div className="w-full space-y-2">
                <h6 className="text-xs">{formattedDate}</h6>
                <h6 className="text-lg font-semibold text-left ">{item.title}</h6>
                <p className="w-full text-xs text-justify text-gray-600">
                    {item.description?.substring(0, 125)} ...
                </p>
            </div>
            <div className="">
                <Link href={`/news-preview/${item._id}`}>
                    <button className="text-[#fea412] hover:text-green-800 border-b-2 text-sm font-semibold border-primary">
                        Read More 
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default NewsCard;
import { FaStar } from "react-icons/fa";

const StartRating = ({rating}:any) => {
    let yellowstars = [];
    let graystars=[];

for (let i = 1; i <= rating; i++) {
    yellowstars.push(<FaStar />);
}
for (let i = 1; i <= (5-rating); i++) {
    graystars.push(<FaStar />);
}

    return ( 
        <div className="flex flex-row">
        <p className="text-md text-yellow-400 flex">{yellowstars}</p>
        <p className="text-md text-gray-400 flex">{graystars}</p>
        </div>
     );
}
 
export default StartRating;
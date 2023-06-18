import HotelTabs from "@/components/Listing/HotelTabs";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useRef } from 'react';
import baseUrl from "../../../../Utils/baseUrl";
import FormCard from "@/components/Listing/FormCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import noimage from "../../../assets/icons/image.png"

const ImagePage = () => {
    const [image, setImage] = useState(null);
    const [imageValue, setImageValue] = useState('');
    const [preview, setPreview] = useState('');
    const [images, setImages] = useState(null);
    const [previews, setPreviews] = useState<any[]>([]);

    const router = useRouter();

    const { hotelId } = router.query;


    let token: any
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem("token");
    }

    const inputRef = useRef(null);

    const onChange = async (event: any) => {
        const input = event.target;
        console.log(input)
        if (input.files) {
            const file = input.files[0];
            setImage(file);

            let formData = new FormData();
            formData.append('cover_img', file);

            console.log(formData)


            try {
                const response = await axios.patch(`${baseUrl}/hotel/coverphoto/${hotelId}`, formData, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const hotel = response.data;
                console.log(hotel);

                setPreview(hotel.cover_image);
            } catch (error) {
                console.error(error);
            }


        }

    }

    const onMultipleChange = async (event: any) => {
        const input = event.target;
        console.log(input)
        if (input.files) {
            const fileList = input.files;
            setImages(fileList);

            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                let formData = new FormData();
                formData.append('gallery_img', file);

                try {
                    const response = await axios.patch(`${baseUrl}/hotel/gallery/${hotelId}`, formData, {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    });

                    const path = response.data;
                    console.log(path);
                    setPreviews(prevPreviews => [...prevPreviews, path]);
                } catch (error) {
                    // Handle any errors that occurred during the request
                    console.error(error);
                }
            }
        }
    };


    const clearGallery = (imglink: any) => {
        setPreviews((prevPreviews) => prevPreviews.filter((path) => path !== imglink));
    };

    const postNext = () => {
        // router.push('/listing/hotel/policies');
        const hotelData = { hotelId: hotelId };
        console.log(hotelData)
        router.push({
            pathname: '/listing/hotel/policies',
            query: hotelData,
        });
    };

    const clear = () => {
        setImage(null)
    }
    return (
        <section className="md:container mx-auto px-10 py-16 flex flex-col gap-8 text-black font-montserrat">

            <h2 className="text-2xl font-semibold mb-6">
                List your property on Bloonsoo.com
            </h2>

            <HotelTabs active_1 active_2 active_3 active_4 />

            <FormCard label="Add Cover photo" >

                <div className="px-4 flex flex-col gap-6">

                    <h4 className="text-sm font-semibold text-gray-600">
                        Add at least cover photo now. You can always add more later.
                    </h4>

                    <div className="w-full h-70vh border rounded-lg border-slate-500 border-dashed">

                        {!image ? (
                            <div className="w-full h-full py-24 flex flex-col items-center justify-between">
                                <div className="w-32 h-32">
                                    <Image
                                        src={noimage}
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

                                <p className="text-base text-gray-400 text-center">Upload your cover photo here</p>

                                <label
                                    htmlFor="cover-img"
                                    className="py-3 px-4 text-blue-500 text-sm font-semibold rounded-lg border border-blue-500 cursor-pointer "
                                >
                                    <FontAwesomeIcon icon={faCamera} className="text-blue-500 text-base mr-2" />
                                    Upload photo
                                </label>

                                <input
                                    className="hidden"
                                    id="cover-img"
                                    type="file"
                                    onChange={onChange}
                                    accept="image/*"
                                    ref={inputRef}
                                />
                            </div>
                        ) : (
                            <div className="relative w-full h-full bg-slate-300">
                                <Image
                                    src={preview}
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

                                <button
                                    onClick={clear}
                                    className="w-8 h-8 rounded-full bg-red-500 absolute top-2 right-2"
                                >
                                    <FontAwesomeIcon icon={faTrash} className="text-white text-sm" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </FormCard>

            <FormCard label="What does your place look like?" >
                <div className="px-4 flex flex-col gap-6">
                    <h4 className="text-sm font-semibold text-gray-600">
                        Add at least 3 photos now. You can always add more later.
                    </h4>

                    <div className="w-full border rounded-lg border-slate-500 border-dashed">
                        {!images ? (
                            <div className="w-full h-full py-24 flex flex-col items-center gap-8">
                                <div className="w-32 h-32">
                                    <Image
                                        src={noimage}
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

                                <p className="text-base text-gray-400 text-center">Upload your gallery photos here</p>

                                <label
                                    htmlFor="gallery-img"
                                    className="py-3 px-4 text-blue-500 text-sm font-semibold rounded-lg border border-blue-500 cursor-pointer"
                                >
                                    <FontAwesomeIcon icon={faCamera} className="text-blue-500 text-base mr-2" />
                                    Upload photo
                                </label>

                                <input
                                    className="hidden"
                                    id="gallery-img"
                                    type="file"
                                    onChange={onMultipleChange}
                                    accept="image/*"
                                    ref={inputRef}
                                />
                            </div>
                        ) : (
                            <div className="w-full grid grid-cols-4 bg-slate-300">
                                {previews.map((preview: any, index: number) => (
                                    <div key={index} className="w-full aspect-square relative">
                                        <Image
                                            src={preview}
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

                                        <button
                                            onClick={() => clearGallery(preview)}
                                            className="w-8 h-8 rounded-full bg-red-500 absolute top-2 right-2"
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="text-white text-sm" />
                                        </button>
                                    </div>
                                ))}

                                <div className="w-full aspect-square grid place-items-center">
                                    <label
                                        htmlFor="gallery-img"
                                        className="py-3 px-4 text-blue-500 text-sm font-semibold rounded-lg border border-blue-500 cursor-pointer"
                                    >
                                        <FontAwesomeIcon icon={faCamera} className="text-blue-500 text-base" />
                                        Add more
                                    </label>

                                    <input
                                        className="hidden"
                                        id="gallery-img"
                                        type="file"
                                        onChange={onMultipleChange}
                                        accept="image/*"
                                        ref={inputRef}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </FormCard>

            <button onClick={postNext} className="w-full py-4 bg-blue-700 text-white font-semibold text-base rounded-lg hover:bg-blue-900">
                Next
            </button>

        </section>
    );
}

export default ImagePage;
'use client'
import axios from "axios";
import NewsCard from "./NewsCard";

import { useEffect, useState } from "react";
import Link from "next/link";
import baseUrl from "../../../Utils/baseUrl";
import newsList from "./data.json";

const NewsList = () => {
    const [news,setNews] = useState (newsList)

    // useEffect(() => {
    //     fetchData()
    // }, []);

    // async function fetchData() {
    //     try {
    //         const res = await axios.get(`${baseUrl}/news`);
    //         console.log(res.data)
    //         setNews(res.data)

    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
    return (
        <div className="flex flex-col w-full gap-6 md:container md:mx-auto md:px-20">
            <h2 className="text-lg font-semibold">NEWS</h2>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
                {news.map((item:any ,index:any)=>(    
                <NewsCard key={index} item={item}/>
                ))}
            </div>

        </div>
    );
}

export default NewsList;
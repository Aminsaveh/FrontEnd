import React, { useEffect, useState } from "react"
import bgImage from "./assets/background.png"
import {Link } from "react-router-dom"
import { useParams } from "react-router"
import { useSelector } from "react-redux"
import Header from "./Header"
import axios from "axios"

export default function DetailsPage() {
    const { id } = useParams()
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(false)
    const [error,setErrorMsg] = useState("")
    const [data, setData] = useState(null)
    const { theme } = useSelector(state => state)

    //Get Data From API Using Axios 

    const getData = async () => {

        setLoading(true)
        setError(false)
        const response = await axios
            .get(`https://api.coingecko.com/api/v3/coins/${id}`)
            .catch(error =>{
                setError(true)
                setErrorMsg("Invalid Currency Name")
            } )
        setLoading(false)
        setData(response.data)


        //Save New Content To Local Storage
        var items = JSON.parse(localStorage.getItem('items'));
        console.log(response.data);
        if(!items){
            items =[];
        }
        let isDuplicated =false;
        for (const element of items) { 
            if(element.id == response.data.id){
                isDuplicated = true;
            }
                
        }
        if(!isDuplicated){
        items.push(response.data);
        if(items && items.length>3){
           items.shift();
        }
        console.log(items);
        localStorage.setItem('items', JSON.stringify(items));
        }
    }


    //Get Data Based on Id Of Data From API
    useEffect(() => {
        getData()
    }, [])


  return(
    <div className={`details ${theme.value && "details-light"}`}>
    <Header />
    {isLoading?
    (
        <div className={`details-content ${theme.value && "details-content-light" }`}>
            <div className="error-content">Loading...</div>
        </div>
    ) : isError ? 
        (
            <div className={`details-content ${theme.value && "details-content-light"}`}>
                <div className="error-content">{error}</div>
            </div>
        ) : (
    <div className={`details-content ${theme.value && "details-content-light"}`}>
        <div className="details-content-coin">
            <img
                src={data.image.large}
            />
        </div>
        <div className="title">{data.name}</div>
        <div className="description" dangerouslySetInnerHTML={{ __html: data.description.en }}>
        </div>
        <div className="pairs">
            <div className="key">Rank:</div>
            <div className="value">  {data.market_cap_rank}</div>
        </div>
        <div className="pairs">
            <div className="key">Current Price:</div>
            <div className="value">$ {data.market_data.current_price.usd}</div>
        </div>
        <div className="pairs">
            <div className="key">Market Cap:</div>
            <div className="value"> ${" "}
                            {(data.market_data.market_cap.usd /1_000_000).toFixed(2)}
                            M
            </div>
        </div>
    </div>
    )}
</div>
  );
}
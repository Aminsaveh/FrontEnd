import React, { useEffect, useState} from "react";
import {Link } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios";
export default function SearchList() {

    const [data, setData] = useState([])
    const [input, setInput] = useState("")
    const [isError, setError] = useState(false)
    const [error , setErrorMsg] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [hovered, setHovered] = useState(-1);
    const { theme } = useSelector(state => state);



    //Change Color Of Each Item On Hover
    const MouseEnter = (index) => {
      setHovered(index);
    }
    const MouseLeave = () => {
      setHovered(-1);
    }



    //Get Data From API Based On Names Entered In Input Field
    const getData = async e => {

        e.preventDefault()
        setLoading(true)
        setError(false)
        const response = await axios
            .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${input.replaceAll('+','%2C').toLowerCase()}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
            .catch(error => 
                {
                setError(true) 
                setErrorMsg("No Result")
            })
        setLoading(false)
        console.log(response.data)
        setData(response.data)
    }



  return ( 
      <div className={`search-list ${theme.value && "search-list-light"}`}>
        <div className="title"> Cryptocurrency Prices by Market Cap </div>
        <form onSubmit={getData}>
            <input
                type = "text"
                className="form-input"
                placeholder="Search For A Crypto Currency...   Use + To Search More Than One Currency"
                onChange={e => setInput(e.target.value.replaceAll('+','%2C'))}
            />
        </form>
        <div className="list">
            <div className="list-row list-header">
                    <div style={{textAlign: "left"}}>Coin</div>
                    <div style={{textAlign: "right"}}>Price</div>
                    <div style={{textAlign: "right"}}>24h Change</div>
                    <div style={{textAlign: "right"}}>Market Cap</div>
            </div>

                {isLoading ?  (
                    <div className="list-content list-single-row">
                        <div>Loading...</div>
                        <div></div>
                    </div>
                ) : isError ?(
                    <div className="list-content list-single-row">
                    {error}
                </div>
                ) : !data.length ?(
                    <div className="list-content list-single-row">
                        List is empty
                    </div>
                ) : (
                    <div> 
                    {data.map((item,index) =>
                        
                        <Link style={{textDecoration: 'none'}}
                        to={`${item.id ? `/details/${item.id}` : "#"}`}>
                        <div className={hovered == index? "list-row list-content hovered" :"list-row list-content" }onMouseEnter={() => MouseEnter(index)} onMouseLeave={MouseLeave}>
                        <div style={{textAlign: "left"}} className="coin">
                            <img src={item.image}className="image"/>
                            <div className="names">
                                <div className="symbol">
                                    {item.symbol}
                                </div>
                                <div className="name">{item.name}</div>
                            </div>
                        </div>
                        <div style={{textAlign: "right"}}>
                            $ {item.current_price}
                        </div>
                        <div
                        style={{textAlign: "right"}} className={`
                        ${item.price_change_percentage_24h > 0 ? "positive"  : "negative"}`}
                        >
                         {
                         item.price_change_percentage_24h
                            }
                            %
                        </div>
                        <div style={{textAlign: "right"}}>
                            ${" "}
                            {(
                            item.market_cap / 1_000_000 ).toFixed(2)}
                            M
                        </div>
                    </div> 
                    </Link>
                    )
                    }
                    </div>
                    )}
             </div> 
      </div>
   )
}
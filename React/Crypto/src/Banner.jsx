import React from "react";
import bnr   from "./assets/banner.jpg"
import { useDispatch, useSelector } from "react-redux"
export default function Banner(){
    const { theme } = useSelector(state => state)

    return(
        <div className="banner" style={{backgroundImage : `url(${bnr})`}}>
                    <div className={`title ${theme.value && "title-light"}`}> Search Coin </div>
                    <div className={`sub ${theme.value && "sub-light"}`}> Get Information From Here</div>
        </div>
    );
}
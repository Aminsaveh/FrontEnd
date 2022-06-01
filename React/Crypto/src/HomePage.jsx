
import React, { useEffect, useState} from "react";
import darkBgImage from "./assets/background.png"
import lightBgImage from "./assets/background-light.jpg"
import {Link } from "react-router-dom"
import { toggleTheme } from "./theme"
import { useDispatch, useSelector } from "react-redux"


//HomePage 
export default function HomePage() {
  //theme
  const dispatch = useDispatch()
  const { theme } = useSelector(state => state)
  //RecentSearches
  const [recentSearches, setRecentSearches] = useState([])

  //Change Theme
  const ChangeTheme = () => {
    dispatch(toggleTheme())
  }


  //Get Recent Searches From LocalStorage
  function getRecentSearches () {
    
    setRecentSearches(JSON.parse(localStorage.getItem('items')));
    console.log(JSON.parse(localStorage.getItem('items')));
  }


  //Get Recent Searches When Page Initialized
  useEffect(() => {
    getRecentSearches()
  }, [])

  return (
    <>
        <div className="home" style={{backgroundImage : `url(${theme.value ? lightBgImage : darkBgImage})` }}>
        <div className="change-theme-part">
                <button className={`change-theme ${theme.value && "change-theme-light"}`} onClick={ChangeTheme}>
                    Change Theme
                </button>
        </div>

        <div className="home-items"> 
              <div className={`home-title ${theme.value && "home-title-light"}`}> 
              Search & Buy <span> Crypto </span>
              </div>
              <div className={`home-sub ${theme.value && "home-sub-light"}`}> 
              Shahid Beheshti University <br />IE Final Project
              </div>
              <Link className={`search ${theme.value && "search-light"}`} to="/search">SEARCH MORE</Link>
          </div>

          <div className="recent-search-list">
            {recentSearches.map(item =>{
              return (
                <Link style={{textDecoration: 'none'}}
                to={`${item.id ? `/details/${item.id}` : "#"}`}>
                <div key={item} className ={`recent-search-list-item ${theme.value && "recent-search-list-item-light"}`}>
                  <img src={item.image.small} className="image"/>
                  <div className="values">
                      <div className="value">${item.market_data.current_price.usd} </div>
                      <div className="title">{item.id} </div>
                  </div>
                  </div>
                  </Link>
              );
            })}
          </div>

        </div>
    </>
  );
}
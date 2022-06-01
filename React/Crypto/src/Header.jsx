import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { toggleTheme } from "./theme"

export default function Header(){
    const dispatch = useDispatch()
    const { theme } = useSelector(state => state)

    const onToggleThemeClick = () => {
        dispatch(toggleTheme())
    }

    return(
        <div  className={`header ${theme.value && "header-light"}`}>
            <div>IE Final Project</div>
            <button className={`header-item ${theme.value && "header-item-light"}`} onClick={onToggleThemeClick}>
                Change Theme
            </button>
        </div>
    );
}



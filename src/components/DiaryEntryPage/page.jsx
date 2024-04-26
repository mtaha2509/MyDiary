

import React from "react"
import "./page.css"
import {SideBar, MainNavBar} from "../DiaryEntryPage"
function DiaryEntryPage(){
return(
    <>
    <div className="page-container">
        <SideBar />
        <div className="page-content">
        <MainNavBar/>
        <a href="#">Choose A template</a>
        </div>
        
    </div>
        
    </>
)
}

export default DiaryEntryPage
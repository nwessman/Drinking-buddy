import React from 'react'
import * as IoIcons from "react-icons/io5"
import * as RiIcons from "react-icons/ri"
import { BsFillCalendar2CheckFill } from "react-icons/bs"



    export const MenuItems = [
    {
        title: "Flights",
        hash:"#flights",
        icon:<IoIcons.IoAirplaneSharp></IoIcons.IoAirplaneSharp>,
        cName: "menuItems",

        
    },
    {
        title: "Hotels",
        hash:"#hotels",
        icon:<RiIcons.RiHotelFill></RiIcons.RiHotelFill>,
        cName: "menuItems"
        
    },
    {
        title: "Activites",
        hash:"#activities",
        icon:<IoIcons.IoAccessibilitySharp></IoIcons.IoAccessibilitySharp>,
        cName: "menuItems"
        
    },
    {
        title: "My Trips",
        hash:"#mytrips",
        icon:<BsFillCalendar2CheckFill></BsFillCalendar2CheckFill>,
        cName: "menuItems"
        
    }

]


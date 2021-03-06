
import './App.css';
import React from 'react';
import Show from '../src/reactjs/show'
import Accommodations from './reactjs/AccommodationPresenter';
import Flights from './reactjs/FlightPresenter';
import Login from './reactjs/LoginPresenter';
import MyTrips from './reactjs/MyTripsPresenter';

import LoadBar from './reactjs/LoadBarPresenter';

import Navigation from './reactjs/NavigationPresenter';


const Search=require('./reactjs/StartSearchPresenter.js').default;
const Activities=require('./reactjs/ActivityPresenter.js').default;
const Details=require('./reactjs/DetailsAccPresenter.js').default;
function App(props) {
  require("./views/navigation.js");

  return (
    <>
      <div >

        <div className=''><LoadBar model={props.model}/></div>

        <Navigation model ={props.model}></Navigation>

         <div className=''><Show hash = "#startsearch"><Search model={props.model}/></Show></div>
         <div className='zoom'><Show hash = "#activities"><Activities model={props.model}/></Show></div>
         <div className=''><Show hash = "#hotels"><Accommodations model={props.model}/></Show></div>
         <div className=''><Show hash="#details_acc"><Details model={props.model} /></Show></div>
         <div className=''><Show hash = "#flights"><Flights model={props.model}/></Show></div>
         <div className=''><Show hash = "#login"><Login model={props.model} /></Show></div>
         <div className=''><Show hash = "#mytrips"><MyTrips model={props.model} /></Show></div>
        </div>
   </>

    
  );
}

export default App; 
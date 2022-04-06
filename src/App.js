
//import logo from './logo.svg';
import './App.css';
import React from 'react';
import Show from '../src/reactjs/show'
import Accommodations from './reactjs/AccommodationPresenter';
import Flights from './reactjs/FlightPresenter';

const Search=require('./reactjs/StartSearchPresenter.js').default;
const Activities=require('./reactjs/ActivityPresenter.js').default;

//const picture = new URL("./images/background.jpg", import.meta.url);
function App(props) {
  require("./views/navigation.js");

  return (
    <>
      <div >
         <div className=''><Show hash = "#startsearch"><Search model={props.model}/></Show></div>
         <div className=''><Show hash = "#activities"><Activities model={props.model}/></Show></div>
         <div className=''><Show hash = "#hotels"><Accommodations model={props.model}/></Show></div>
         <div className=''><Show hash = "#flights"><Flights model={props.model}/></Show></div>
        </div>
   </>

    
  );
}

export default App;

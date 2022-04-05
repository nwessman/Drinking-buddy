//import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import NavigationView from './views/NavigationView';
import Show from '../src/reactjs/show'
<<<<<<< HEAD
import StartSearchView from './views/StartSearchView';
import { API_KEY, BASE_URL } from './apiConfig';


function App() {
  const url = BASE_URL+'places?'+ API_KEY;
  const [pdata, setData] = useState([{}]);
  useEffect(() => {
    fetch(`${'https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=rect%3A10.716463143326969%2C48.755151258420966%2C10.835314015356737%2C48.680903341613316&limit=20&apiKey=6fadd36eb9104ef28768e045a0c32bda'}`,{  "method": "GET",}).then(
      res => res.json()

    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, []);
=======

const Search=require('./reactjs/StartSearchPresenter.js').default;

//const picture = new URL("./images/background.jpg", import.meta.url);
function App(props) {
>>>>>>> origin/main
  return (
    <>
      <div className='background_image'>
         <Show><NavigationView></NavigationView></Show>
<<<<<<< HEAD
         <Show><StartSearchView>{(typeof pdata.results=== 'undefined') ? (
           <div><p>Data is loading...</p></div>
         ): (
           <div><ul> {console.log(pdata)}</ul> </div>

         )}</StartSearchView></Show>
        
=======
         <Show><Search model={props.model}/></Show>
>>>>>>> origin/main
        </div>
   </>

    
  );
}

export default App;

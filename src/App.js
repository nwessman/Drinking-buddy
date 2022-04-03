//import logo from './logo.svg';
import './App.css';
import React from 'react';
import NavigationView from './views/NavigationView';
import Show from '../src/reactjs/show'

const Search=require('./reactjs/StartSearchPresenter.js').default;

//const picture = new URL("./images/background.jpg", import.meta.url);
function App(props) {
  return (
    <>
      <div className='background_image'>
         <Show><NavigationView></NavigationView></Show>
         <Show><Search model={props.model}/></Show>
        </div>
   </>

    
  );
}

export default App;

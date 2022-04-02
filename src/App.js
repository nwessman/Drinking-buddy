//import logo from './logo.svg';
import './App.css';
import React from 'react';
import NavigationView from './views/NavigationView';
import Show from '../src/reactjs/show'
import StartSearchView from './views/StartSearchView';

//const picture = new URL("./images/background.jpg", import.meta.url);
function App() {
  return (
    <>
      <div className='background_image'>
         <Show><NavigationView></NavigationView></Show>
         <Show><StartSearchView></StartSearchView></Show>
        </div>
   </>

    
  );
}

export default App;

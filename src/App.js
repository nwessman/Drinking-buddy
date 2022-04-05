//import logo from './logo.svg';
import './App.css';

import NavigationView from './views/NavigationView';
import Show from '../src/reactjs/show'
import StartSearchView from './views/StartSearchView';
import Search from './reactjs/StartSearchPresenter';

function App(props) {
  return (
    <>
      <div className='background_image'>

         <NavigationView></NavigationView>
         <Search model={props.model}></Search>
         
      </div>
   </>

    
  );
}

export default App; 

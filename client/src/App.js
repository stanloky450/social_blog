 import React from 'react';
 import MainRouter from './MainRouter'
 import {BrowserRouter} from 'react-router-dom'
 //import axios from 'axios';


 const App = () => (
      <BrowserRouter>
          <MainRouter/>
    </BrowserRouter>
 );


// class App extends Component {
//   render() {
//     return (
//       <div className="container">
//           <h1> React Front End</h1>
//       </div>
//     ); 
//   }
// }
export default App;
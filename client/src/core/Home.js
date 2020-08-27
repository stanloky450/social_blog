import React from 'react' 
import Posts from '../post/Post'

const Home = () => (
   <div>
        <div className="jumbotron">
        <h2>Home</h2>
        <p className="lead" > Welcome To React FrontEnd</p>   
    </div>

    <div className="container">
        <Posts />
    </div>
   </div>
);

export default Home;
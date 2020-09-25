import React from "react";
import Posts from "../post/Post";

const Home = () => (
  <div>
    <div className='jumbotron'>
      <h2>PAWRITE</h2>
      <p className='lead'> Welcome To Pawrite Social Blog</p>
    </div>

    <div className='container'>
      <Posts />
    </div>
  </div>
);

export default Home;

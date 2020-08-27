import React from 'react'; 
import { Link, withRouter } from 'react-router-dom';
import {signout, isAuthenticated} from '../auth/index';
// import Admin from './admin/Admin';


const isActive = (history, path) => {
    if(history.location.pathname === path) return {color: "#ff9"}
        else return {color: "#ffffff"}
}



const Menu = ({history}) => (
    <div >

        <ul className="nav nav-navtab bg-primary">
        <li className="nav-item">
        <Link className="nav-link" to="/" style={isActive(history, "/")}>Home</Link> 
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/users" style={isActive(history, "/users")}>Users</Link> 
        </li>

        {!isAuthenticated() && (
            <>
        <li className="nav-item">
        <Link className="nav-link" to="/signup" style={isActive(history, "/signup")} >Signup</Link> 
        </li>
        
        <li className="nav-item">
        <Link className="nav-link" to="/signin" style={isActive(history, "/signin")} >Signin</Link>
        </li>
        </>
        )}
        
        {isAuthenticated() && (
            <>
                <li className="nav-item">
                <Link to={`/findpeople`} style={isActive(history, `/findpeople`)} className="nav-link">
                    Find People
                </Link>
                </li>
                <li className="nav-item">
                <Link to={`/post/create`} style={isActive(history, `/post/create`)} className="nav-link">
                    create Post
                </Link>
                </li>
                

                {isAuthenticated() && isAuthenticated().user.role === "admin" && (
    <li className="nav-item">
        <Link
            to={`/admin`}
            style={isActive(history, `/admin`)}
            className="nav-link"
        >
            Admin
        </Link>
    </li>
)}
        <li className="nav-item">
        <span  className="nav-link" style={(isActive(history, "/signin"),
         {cursor:"pointer" ,color:"#fff"})}  onClick={() => signout(() => history.push('/'))}>
            Signout </span>
        </li>

        <li className="nav-item">
            <Link to={`/user/${isAuthenticated().user._id}`}  style={isActive(history, `/user/${isAuthenticated().user._id}`)} className="nav-link">
            {`${isAuthenticated().user.name}'s profile`}  </Link>  
        </li>
        </>
        )}


    </ul>       
    </div>
);

export default withRouter (Menu);
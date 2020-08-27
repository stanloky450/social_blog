import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import {isAuthenticated} from '../auth'
import { signout } from '../auth'
import {remove} from './apiUser'


class DeleteUser extends Component {
    state = {
        redirect:false
    };
    
    deleteAccount = () => {
        const token = isAuthenticated().token
        const userId = this.props.userId 
        remove(userId, token)
        .then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                //signout user
                signout(() => console.log('user is Deleted '))
                //redirect
                this.setState({redirect:true})
            }
        })
    }

    deleteConfirmed = () => {
     
        let answer = window.confirm(
            "Are you sure you want to delete your Account");

        if (answer) {
            this.deleteAccount();
        }
    };


    render() {
        if(this.state.redirect){
            return < Redirect to="/" />;
        }
        return (
            <button onClick={this.deleteConfirmed} 
            className="btn btn-raised btn-danger "> 
            Delete Profile</button>
            
        );
        
    }
}

export default DeleteUser;

import React, { Component } from 'react';
import {isAuthenticated} from '../auth';
import {read, update, updateUser} from './apiUser'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import defaultImage from '../image/Avatar.jpg'

class EditProfile extends Component {
    constructor (){
        super()
        this.state = {
            id: "",
            name:"",
            email: "",
            password: "",
            redirectToProfile:false,
            error:"",
            loading:false,
            fileSize:0,
            about:""
            
           
        };
    }

    init = userId => {
        const token = isAuthenticated().token;
            read(userId, token )
            .then(data => {
                if (data.error) {
                    this.setState({redirectToProfile:true})
                }
                else{
                    this.setState({
                         id: data._id,
                         name: data.name, 
                         email:data.email, 
                         error:"",
                        about: data.about});
                         
                }
            })
    }

    componentDidMount() {
        this.userData = new FormData()
        const userId = this.props.match.params.userId
        this.init(userId)
    }

    isValid = () => {
        const {name, email, password,fileSize} = this.state
        if (fileSize > 1000000) {
            this.setState({
              error: "File size should be less than 100kb",
              loading: false
            });
            return false;
          }
        if(name.length === 0) {
            this.setState({error: "Name is Required"})
            return false 
        }
        //email using REGEX
        if(!/.+\@.+\..+/.test(email))   {
            this.setState({error: "A Valid Email is Required",loading: false});
            return false 
        }
        if(password.length >= 1 && password.length <= 5) {
            this.setState({
                error: "password must be atleast 6 charcters ",loading: false
            });
            return false 
        }
        return true;
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        const fileSize = name === "photo" ? event.target.files[0].size : 0;

        this.userData.set(name, value)
        this.setState({ [name]: value, fileSize})
    }

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
    
        if (this.isValid()) {
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;
    
            update(userId, token, this.userData).then(data => {
                if (data.error) {
                    this.setState({ error: data.error });
                    // if admin only redirect
                } else if (isAuthenticated().user.role === "admin") {
                    this.setState({
                        redirectToProfile: true
                    });
                } else {
                    // if same user update localstorage and redirect
                    updateUser(data, () => {
                        this.setState({
                            redirectToProfile: true
                        });
                    });
                }
            });
        }
    };
    



    signupForm = (name, email, password, about) => (
        <form>

                        <div className="form-group">
                          <label className="text-muted">Profile Photo</label>
                          <input onChange={this.handleChange("photo")} type="file" accept="image/*"
                           className="form-control"  />
                      </div>
                      <div className="form-group">
                          <label className="text-muted">Name</label>
                          <input onChange={this.handleChange("name")} type="text"
                           className="form-control" value={name} />
                      </div>
                      <div className="form-group">
                          <label className="text-muted">Email</label>
                          <input onChange={this.handleChange("email")} type="email" 
                            className="form-control" value={email} />
                      </div>
                      <div className="form-group">
                          <label className="text-muted">About</label>
                          <textarea onChange={this.handleChange("about")} type="text" 
                            className="form-control" value={about} />
                      </div>
                      
                      <div className="form-group">
                          <label className="text-muted">Password</label>
                          <input onChange={this.handleChange("password")} type="password" 
                          className="form-control"  value={password} />
                      </div>
                      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Update</button>
        </form>
    )

    render() {
        const {id,
            name, 
            email, 
            password, 
            redirectToProfile, 
            error, 
            loading,
            about 
        } = this.state;
        if(redirectToProfile){
           return < Redirect to={`/user/${id}`} />
        }
       
        const photoUrl = id
        ? `${ process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}`: defaultImage;
        return (
            <div className="container">
                <h1 className="mt-5 mb-5" > Edit Profile</h1>
                <div className="alert alert-danger" 
              style={{display: error ? "" : "none"}}>
                  {error}
              </div>

              {loading ? <div className="jumbotron text-center">
                  <h2>Loading...</h2>
              </div> : ""}

              <img
          style={{ height: "200px", width: "auto" }}
          className="img-thumbnail"
          src={photoUrl}
          onError={i => (i.target.src = `${defaultImage}`)}
          alt={name}
        />

            {isAuthenticated().user.role === "admin" &&
          this.signupForm(name, email, password, about)}

        {isAuthenticated().user._id === id &&
          this.signupForm(name, email, password, about)}
            </div>
            
        );
    }
}

export default EditProfile;




// import React, { Component } from 'react';
// import {isAuthenticated} from '../auth';
// import {read, update} from './apiUser';
// import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

// class EditProfile extends Component {
//     constructor (){
//         super()
//         this.state = {
//             id: "",
//             name: "",
//             email: "",
//             password: "",
//             redirectToProfile:false
           
//         }
//     }

//     init = (userId) => {
//         const token = isAuthenticated().token
//             read(userId, token )
//             .then(data => {
//                 if (data.error) {
//                     this.setState({redirectToProfile:true})
//                 }
//                 else{
//                     this.setState({
//                         id:    data._id,
//                         name:  data.name,
//                         email: data.email,
//                         error: ""
          
//                     });
//                 }
//             })
//     }

//     componentDidMount() {
//         const userId = this.props.match.params.userId
//         this.init(userId)
//     }

//     handleChange = (name) => (event) => {
      
//         this.setState({ [name]: event.target.value})
//     }

//     clickSubmit = event => {
//         event.preventDefault()
//         const {name, email, password} = this.state;
//         const user = {
//             name,
//             email, 
//             password
//         };
//       //  console.log(user) 
//       const userId = this.props.match.params.userId
//       const token = isAuthenticated().token
//        update(userId, token, user).then(data => {
//             if(data.error)
//              this.setState({error: data.error})
//             else
//                 this.setState({
//                     redirectToProfile:true
//                 });
//         });
//     };


//     signupForm = (name, email, password) => (
//         <form>
//                       <div className="form-group">
//                           <label className="text-muted">Name</label>
//                           <input onChange={this.handleChange("name")} type="text"
//                            className="form-control" value={name} />
//                       </div>
//                       <div className="form-group">
//                           <label className="text-muted">Email</label>
//                           <input onChange={this.handleChange("email")} type="email" 
//                             className="form-control" value={email} />
//                       </div>
//                       <div className="form-group">
//                           <label className="text-muted">Password</label>
//                           <input onChange={this.handleChange("password")} type="password" 
//                           className="form-control"  value={password} />
//                       </div>
//                       <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Update</button>
//                   </form>
//     )

//     render() {
//         const {id,name, email, password,redirectToProfile} = this.state
//         if(redirectToProfile) {
//             return <Redirect  to={`/user/${id}`} />
//         }

//         return (
//             <div className="container">
//                 <h1 className="mt-5 mb-5" > Edit Profile</h1>
//                 {this.signupForm(name, email, password)}
//             </div>
//         );
//     }
// }

// export default EditProfile;

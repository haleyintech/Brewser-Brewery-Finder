import axios from 'axios'
import React from 'react'
import {Link} from 'react-router-dom'
import {baseUrl} from '../../Shared/baseUrl'
import "../../App.css";
import MainMenu from '../../Shared/MainMenu';
import { toast } from 'react-toastify';
import { toastOptions } from '../../Shared/toastOptions';

export default function Register() {
    const [formData, setFormData] = React.useState({
        username: '',
        password: '',
        confirmPassword: '',
        role: 'USER',
        breweryId: ''
    })


    function handleInputChange(event) {
        const {name, value} = event.target;
        setFormData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    function handleSubmit() { // Change BreweryId back to null if user registers as 'beer lover'
        if (formData.role === "USER") {
            formData.breweryId = ""
        }
        const data = {
            username: formData.username,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            role: formData.role,
            breweryId: formData.breweryId
        }

 
        if (formData.password !== formData.confirmPassword) {
            toast.error("Password and Confirm Password must match!",toastOptions);
        } else {
            axios.post(baseUrl + "/register", data).then(response => {
                console.log(response.status)
                if (response.status === 201) {
                    toast.error("Registration Complete.", toastOptions);
                    window.history.back();
                    
                } else {
                    throw new Error("Error")
                }
            }).catch(error => {
                console.log(error.response)
                toast.error("Invalid Entry. Make sure all fields are filled with proper values.", toastOptions);
            })

        }
    }


    console.log(formData)

    return (
        <div><MainMenu />
        <h1>Create New Account</h1>
        <div class="register-container">
            <div class="register-box">
            <fieldset className='experience'>
                <p>Beer Lovers for most, Brewer for brewery business admins.</p>
                <label>
                    <input className="experience--radio" type="radio" name="role" value="USER"
                        onChange={handleInputChange}
                        checked={
                            formData.role === "USER"
                        }/>
                    Beer Lover
                </label>
                <label>
                    <input className="experience--radio" type="radio" name="role" value="BREWER"
                        onChange={handleInputChange}
                        checked={
                            formData.role === "BREWER"
                        }/>
                    Brewer
                </label>

            </fieldset>
            <label className='sr-only'>Brewery Id</label>
            {
            formData.role === "BREWER" && <input type="number" id="breweryId" name="breweryId"
                value={
                    formData.breweryId
                }
                className='form-control'
                placeholder='Brewery Id'
                v-model="user.breweryId"
                onChange={handleInputChange}/>
        }
            <label class="sr-only">Username</label>
            <input type="text" id="username" name="username" class="form-control" placeholder="Username" v-model="user.username"
                onChange={handleInputChange}
                required/>
            <label class="sr-only">Password</label>
            <input type="password" id="password" name="password" class="form-control" placeholder="Password" v-model="user.password"
                onChange={handleInputChange}
                required/>
            <input type="password" id="password-confirm" name="confirmPassword" class="form-control" placeholder="Confirm Password" v-model="user.password"
                onChange={handleInputChange}
                required/>
                            <button class="sign-in-btn" type="submit"
                onClick={handleSubmit}>create account</button>
            <Link to="/login"><button class="sign-in-btn">back to login?</button></Link>

        </div>
        </div>
        </div>
    )
}


// class Register extends Component{

//     constructor(props){
//         super(props);
//         this.state = {
//             username: '',
//             password: '',
//             confirmPassword: '',
//             role: '',
//             breweryId: null,
//         }

//     }


//     handleInputChange = (event) => {
//         event.preventDefault()
//         const {name,value} = event.target;
//         this.setState({
//             ...this.state,
//             [name]: value
//         })
//         console.log(this.state)
//     }

//     handleSubmit = () => {
//         const data = {username: this.state.username, password: this.state.password, confirmPassword: this.state.confirmPassword, role: this.state.role, breweryId: this.state.breweryId}
//         if(this.state.password === this.state.confirmPassword){
//             axios.post(baseUrl + "/register", data)
//         }else{
//             alert("Password and Confirm Password must match!!!")
//         }
//     }

//     render(){
//         return(
//             <div>
//                 <h1>Create Account</h1>
//                 <fieldset className='experience'>
//                     <legend>Choose your Experience</legend>
//                     <input className="experience--radio"
//                         type="radio"
//                         value="USER"
//                         onChange={this.handleInputChange}
//                         checked={this.state.role === "USER"}
//                         name="role"/>
//                     <label htmlFor='user'>Beer Lover</label>
//                     <input className="experience--radio"
//                         type="radio"
//                         value="BREWER"
//                         onChange={this.handleInputChange}
//                         checked={this.state.role ==="BREWER"}
//                         name ="role"/>
//                     <label htmlFor='brewer'>Brewer</label>
//                 </fieldset>
//                 <label className='sr-only'>Brewery Id</label>
//                 {this.state.role === "BREWER" && <input
//                     type="number"
//                     id="breweryId"
//                     name="breweryId"
//                     className='form-control'
//                     placeholder='Brewery Id'
//                     v-model="user.breweryId"
//                     onChange={this.handleInputChange}

//                 />}
//                 <label class="sr-only">Username</label>
//                 <input
//                     type="text"
//                     id="username"
//                     name="username"
//                     class="form-control"
//                     placeholder="Username"
//                     v-model="user.username"
//                     onChange={this.handleInputChange}
//                     required
//                 />
//                 <label class="sr-only">Password</label>
//                 <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     class="form-control"
//                     placeholder="Password"
//                     v-model="user.password"
//                     onChange={this.handleInputChange}
//                     required
//                 />
//                 <input
//                     type="password"
//                     id="password-confirm"
//                     name="confirmPassword"
//                     class="form-control"
//                     placeholder="Confirm Password"
//                     v-model="user.password"
//                     onChange={this.handleInputChange}
//                     required
//                 />
//                 <Link to="/login">Have an account?</Link>
//                 <button type="submit" onClick={this.handleSubmit}>Sign in</button>
//             </div>
//         )
//     }
// }

// export default Register;

import { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {addToken, addUser} from '../../Redux/actionCreators'
import {baseUrl} from '../../Shared/baseUrl'
import axios from 'axios'
import "../../App.css";
import MainMenu from '../../Shared/MainMenu';

const mapDispatchToProps = (dispatch) => ({
    addToken: () =>  dispatch(addToken()),
    addUser: () => dispatch(addUser()) 
});

class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    

    handleLogin = async () => {
        const data = { username: this.state.username, password: this.state.password };
        

        const userWithToken = await axios.post(baseUrl + '/login', data)

        
        await this.props.dispatch(addToken(userWithToken.data.token))
        await this.props.dispatch(addUser(userWithToken.data.user));
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <div><MainMenu />
            <div class="login-container">
            <h1>Sign in for tasty BREWs</h1>
            <div class="login-box">
                <label class="signin-text">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    class="form-control"
                    placeholder=""
                    v-model="user.username"
                    onChange={this.handleInputChange}
                    required
                />
                <label class="signin-text">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    class="form-control"
                    placeholder=""
                    v-model="user.password"
                    onChange={this.handleInputChange}
                    required
                />
                <button class="sign-in-btn" type="submit" onClick={this.handleLogin}>Sign in</button>
                <Link to="/register"><button class="sign-in-btn" type="submit">Create account</button></Link>
            </div>
            </div>
            </div>
        )
    }
}

export default withRouter(connect(mapDispatchToProps)(Login));
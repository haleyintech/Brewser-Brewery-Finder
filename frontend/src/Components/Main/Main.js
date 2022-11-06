import {Component} from 'react'
import {Switch, Route, Redirect, Link} from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import Beers from '../Beers/Beers'
import Breweries from '../Breweries/Breweries'
import Reviews from '../Reviews/Reviews'
import BeerInfo from '../Beers/BeerInfo'
import BreweryInfo from '../Breweries/BreweryInfo'
import ReviewInfo from '../Reviews/ReviewInfo'
import {addToken, deleteUser} from '../../Redux/actionCreators'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser())}
});

class Main extends Component {
    constructor(props){
        super(props);
    }

    handleLogout = () => {
        this.props.addToken("")
        this.props.deleteUser()
    }

    render(){
        // set default page based on user role
        let defaultUrl = "/breweries";
        let loginUrl = "/login";
        return(
            <div>
                {(this.props.token.token !== undefined && this.props.location.pathname===loginUrl) ?
                        <div>
                            <Redirect to={defaultUrl}/>
                        </div>  
                    : null
                }
                {(this.props.token.token === undefined && this.props.location.pathname!=="/register") ?
                        <div>
                            <Redirect to={loginUrl}/>
                        </div>  
                    : null
                }
                <Switch>
                    <Route path={loginUrl} component={() => <Login/>}/>
                    <Route path='/register'component={() => <Register/>}/>
                    <Route path='/breweries' component={() => <Breweries/>}/>
                    <Route path='/brewery-info' component={() => <BreweryInfo/>}/>
                    <Route path='/beers' component={() => <Beers/>}/>
                    <Route path='/beer-info' component={() => <BeerInfo/>}/>
                    <Route path='/reviews' component={() => <Reviews/>}/>
                    <Route path='/review-info' component={() => <Reviews/>}/>
                </Switch>
            </div>
        )
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
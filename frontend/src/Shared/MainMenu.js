import * as React from 'react';
import { addToken, deleteUser } from '../Redux/actionCreators'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import './MainMenuStyle.css';

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser()) }
});

function MainMenu(props) {
    const handleLogout = (event) => {
        event.preventDefault();
        props.addToken("");
        props.deleteUser();
        window.location="/login"
    }
    return (
        <div className='mainMenu'>
            <nav className="mainMenu">
                <Link className="nav-logo" to="/breweries">Brew-ster</Link>
                <div>
                <Link to='/breweries'><button className="nav-btn" type="button">Breweries</button></Link>
                <Link to='/beers'><button className="nav-btn" type="button">Beers</button></Link>
                <Link to='/reviews'><button className="nav-btn" type="button">Reviews</button></Link>
                <button className="nav-btn" type="button" onClick={handleLogout}>Logout</button>
                </div>
                
            </nav>
        </div>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainMenu));
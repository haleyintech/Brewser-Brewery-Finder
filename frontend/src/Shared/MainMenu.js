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
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand ms-2" to="/breweries">Project Name</Link>
                <div>
                <Link to='/breweries'><button className="btn btn-secondary ms-4 me-2" type="button">Breweries</button></Link>
                <Link to='/beers'><button className="btn btn-secondary me-2" type="button">Beers</button></Link>
                <Link to='/reviews'><button className="btn btn-secondary me-2" type="button">Reviews</button></Link>
                <button className="btn btn-secondary ms-2 me-2" type="button" onClick={handleLogout}>Logout</button>
                </div>
                
            </nav>
        </div>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainMenu));
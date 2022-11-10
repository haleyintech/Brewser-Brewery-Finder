import * as React from 'react';
import { addToken, deleteUser } from '../Redux/actionCreators'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

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
    const handleLogout = () => {
        props.addToken("")
        props.deleteUser()
    }
    return (
        <div>
            <Link to='/breweries'>Breweries | </Link>
            <Link to='/beers'>Beers | </Link>
            <Link to='/reviews'>Reviews | </Link>
            <Link to='/login' onClick={handleLogout}>Logout</Link>
        </div>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainMenu));
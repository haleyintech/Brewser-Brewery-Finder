import * as React from 'react';
import { Link } from 'react-router-dom';
import MainMenu from '../../Shared/MainMenu';

function Beers(props) {
    return (
        <div>
            <MainMenu />
            Beers component
            <Link to="/beer-info?123">Beer Info</Link>
        </div>
    )
}

export default Beers;

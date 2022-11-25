import * as React from 'react';
import MainMenu from '../../Shared/MainMenu';
import { baseUrl } from '../../Shared/baseUrl';
import axios from 'axios';
import { setAuthHeader } from '../../Redux/token';
import { useSelector } from 'react-redux';
import ReviewCard from './ReviewCard';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import { toastOptions } from '../../Shared/toastOptions';
import '../Breweries/BreweryStyles.css'

function Reviews(props) {

    const [reviews, setReviews] = React.useState([])

    const token = useSelector(state => state.token.token);
    const user = useSelector(state => state.user);

    React.useEffect(() => {
        if (token) {
            setAuthHeader(token);
            getReviews()
        }
    }, [token])

    /*orig - nov22
        async function getReviews() {
            try {
                // get list of reviews 
                let response = await axios.get(baseUrl + "/reviews");
                // and save to state
                setReviews(response.data);
            } catch (ex) {
                alert(ex);
            }
        }
    */
    /* new nov22- getReviews of selected beer */
    async function getReviews() {
        try {
            let response = null;
            let beerId = getBeerId();
            if (beerId === "0") {
                // get list of all reviews 
                response = await axios.get(baseUrl + "/reviews");
            } else {
                // get list of all reviews 
                response = await axios.get(baseUrl + "/reviews/beer/" + beerId);
            }
            // and save to state
            setReviews(response.data);
        } catch (ex) {
            toast.error(ex.message, toastOptions);
        }
    }
    function getBeerId() {
        if (window.location.search && window.location.search.indexOf("?beerId=") >= 0) {
            return window.location.search.substring(8);
        } else {
            return "0";
        }
    }

    function redirectToCaller(event) {
        event.preventDefault();
        window.history.back();
    }
    /* end of new */

    const reviewElements = reviews.map(review => {
        return (<ReviewCard
            key={review.reviewId}
            userId={review.userId}
            beerId={review.beerId}
            description={review.description}
            rating={review.rating} />)
    })

    return (
        <div>
            <MainMenu />
            <div>
                <h1 class='brewery-list-container'>Beer Reviews</h1></div>

            {getBeerId() !== "0" ?
                (
                    <div className='col d-flex justify-content-end me-3'>
                        <Link to={"/review-info?beerId=" + getBeerId()}><button className="btn btn-primary" type="button">Add Review</button></Link>
                        <button className="btn btn-primary ms-2" type="cancel" onClick={redirectToCaller}>Cancel</button>
                    </div>
                ) : null
            }

            <div className='grid-container-beers'>
                {reviewElements}
            </div>
        </div>
    )
}

export default Reviews;
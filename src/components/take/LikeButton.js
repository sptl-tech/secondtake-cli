import React, { Component } from 'react'
import MyButton from '../../util/MyButton'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import {connect} from 'react-redux' 
import { likeTake, unlikeTake} from '../../redux/actions/dataActions'


export class LikeButton extends Component {
    likedTake = () =>{
        if(
        this.props.user.likes &&
        this.props.user.likes.find(like => like.takeId === this.props.takeId)){ //to check if user has liked the take
            return true;
        }
        else{
            return false;
        }
    }
    likeTake = () => {
        this.props.likeTake(this.props.takeId);
    }
    unlikeTake = () =>{
        this.props.unlikeTake(this.props.takeId);
    }
    render() {
        const {authenticated} = this.props.user;
        const likeButton = !authenticated ? ( //checks if user is authenticated => If not logged in, clicking the like button will redirect to login page
            <Link to="/login"> 
            <MyButton tip="Like">
                <FavoriteBorder color="primary"/>
            </MyButton>
            </Link>
        ) : this.likedTake() ? (//if take is shown in liked array with that user
                <MyButton tip="Undo Like" onClick={this.unlikeTake}>
                    <FavoriteIcon color="primary" />
                </MyButton>
            ) : ( //if not liked
                <MyButton tip="Like" onClick={this.likeTake}>
                    <FavoriteBorder color="primary" />
                </MyButton>
            );
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    takeId: PropTypes.string.isRequired,
    likeTake: PropTypes.func.isRequired,
    unlikeTake: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likeTake,
    unlikeTake
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)

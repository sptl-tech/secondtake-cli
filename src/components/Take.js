import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

import { connect } from 'react-redux';
import { likeTake, unlikeTake} from '../redux/actions/dataActions'
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton'


//Material UI imports 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'



const styles ={
    card:{
        display: 'flex', 
        marginBottom: 20

    },
    image:{
        minWidth: 200,
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

class Take extends Component {
    likedTake = () =>{
        if(this.props.user.likes && this.props.user.likes.find(like => like.takeId === this.props.take.takeId)){ //to check if user has liked the take
            return true;
        }
        else{
            return false;
        }
    }
    likeTake = () => {
        this.props.likeTake(this.props.take.takeId);
    }
    unlikeTake = () =>{
        this.props.unlikeTake(this.props.take.takeId);
    }
    render() { 
        dayjs.extend(relativeTime)
        const { classes, take : {body, commentCount, createdAt, likeCount, userHandle, userImage}, user: {authenticated} } = this.props //extracts info from the takes and passes to props to use in file
        
        const likeButton = !authenticated ? ( //checks if user is authenticated => If not logged in, clicking the like button will redirect to login page
            <MyButton tip="Like">
                <Link to="/login"> 
                    <FavoriteBorder color="primary"/>
                </Link>
            </MyButton>
        ) : (
            this.likedTake() ? ( //if take is shown in liked array with that user
                <MyButton tip="Undo Like" onClick={this.unlikeTake}>
                    <FavoriteIcon color="primary" />
                </MyButton>
            ) : ( //if not liked
                <MyButton tip="Like" onClick={this.likeTake}>
                    <FavoriteBorder color="primary" />
                </MyButton>
            )
        )
        return (
           <Card className ={classes.card}>
               <CardMedia image={userImage} title="Profile Image" className = {classes.image}/>
                <CardContent className = {classes.content}>
                    <Typography variant = "h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                    <Typography variant = "body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant = "body1">{body}</Typography>
                    {likeButton}
                    <span>{likeCount} Likes</span>
                    <MyButton tip ="Comments">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} Comments</span>
                </CardContent>
           </Card>
        )
    }
}

Take.propTypes = {
    likeTake: PropTypes.func.isRequired,
    unlikeTake: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    take: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionsToProps = {
    likeTake,
    unlikeTake
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Take));

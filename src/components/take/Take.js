import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import DeleteTake from './DeleteTake'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton'
import TakeDialog from './TakeDialog'
import LikeButton from './LikeButton';

//Material UI imports 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat'



const styles ={
    card:{
        position: 'relative',
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
    
    render() { 
        dayjs.extend(relativeTime)
        const { classes, take : {body, commentCount, createdAt, likeCount, userHandle, takeId, userImage}, user: {authenticated, credentials: {handle}} } = this.props //extracts info from the takes and passes to props to use in file
        
        

    const deleteButton = //allows users who are logged in to delete thier OWN takes
            authenticated && userHandle === handle ? ( 
            <DeleteTake takeId={takeId} />
        ) : null
        return (
           <Card className ={classes.card}>
               <CardMedia image={userImage} title="Profile Image" className = {classes.image}/>
                <CardContent className = {classes.content}>
                    <Typography variant = "h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant = "body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant = "body1">{body}</Typography>
                    <LikeButton takeId={takeId} />
                    <span>{likeCount} Likes</span>
                    <MyButton tip ="Comments">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} Comments</span>
                    <TakeDialog takeId={takeId} userHandle={userHandle} openDialog={this.props.openDialog} />
                </CardContent>
           </Card>
        )
    }
}

Take.propTypes = {
    user: PropTypes.object.isRequired,
    take: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool

}

const mapStateToProps = state => ({
    user: state.user
})



export default connect(mapStateToProps)(withStyles(styles)(Take));

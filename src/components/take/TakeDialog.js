//Component to view take and information when clicked on (expands the take)

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../../util/MyButton'
import dayjs from 'dayjs'
import {Link} from 'react-router-dom'
import LikeButton from './LikeButton'
import Comments from './Comments'
import CommentForm from './CommentForm'
//MUI
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import CloseIcon from '@material-ui/icons/Close'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import ChatIcon from '@material-ui/icons/Chat'
//Redux
import {connect} from 'react-redux'
import {getTake, clearErrors} from '../../redux/actions/dataActions'

const styles = theme => ({
    ...theme.spread,
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
        
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'Center',
        marginTop: 50,
        marginBottom: 50
    },
    invisibleSeperator:{
        border: 'none',
        margin: 4
      },
      visibleSeperator:{
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    }

})

class TakeDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: '',
        getTakeData: false
    }
    componentDidMount(){ //check if we have open dialog
        if(this.props.openDialog && !this.state.getTakeData){
            this.setState({getTakeData: true})
            this.handleOpen()
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.openDialog && !this.state.getTakeData) {
          this.setState({ getTakeData: true });
          this.handleOpen();
        }
      }
    
    handleOpen = () => { //when we open the dialog, need to send a request to server to retrieve that take
        //logic: want to set the path to the take as it would be seen in a dialog to the user's page 
        //We also want to reset the path when we click out of the take on the home page 
        
        let oldPath = window.location.pathname; //current location 

        const {userHandle, takeId} = this.props;
        const newPath = `/users/${userHandle}/take/${takeId}`; //path for take when dialog pops up

        if(oldPath === newPath) oldPath = `users/${userHandle}` //edge case for when you directly go to take dialog url
        
        window.history.pushState(null, null, newPath); //set url to new path when the dialog opens 

        this.setState({open: true, oldPath, newPath})
        this.props.getTake(this.props.takeId)
    }
    handleClose = () => { //when exit out of dialog
        window.history.pushState(null, null, this.state.oldPath); //reverts back to old path when clicked out of take

        this.setState({open: false, getTakeData: false})
        this.props.clearErrors();
    }
    render(){
        const {classes, take: {takeId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments}, 
        UI: {loading}} = this.props;

        const dialogMarkup = loading ? ( //if loading, show the circular progress, else
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
        ): (
            <Grid container spacing={16}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage} />
                </Grid>
                <Grid item sm={7}>
                    <Typography 
                        component={Link} //links to user's page
                        color="primary"
                        variant="h5"
                        to={`/users/${userHandle}`}
                        >
                            @{userHandle}
                        </Typography>
                        <hr className={classes.invisibleSeperator} />
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')} 
                        </Typography>
                        <hr className= {classes.invisibleSeperator} />
                        <Typography variant="body1">
                            {body} 
                        </Typography>
                        <LikeButton takeId={takeId} />
                        <span>{likeCount} Likes</span>
                        <MyButton tip ="Comments">
                            <ChatIcon color="primary" />
                        </MyButton>
                        <span>{commentCount} Comments</span>
                </Grid>
                <hr className={classes.visibleSeperator} />
                <CommentForm takeId={takeId} />
                <Comments comments={comments} />
            </Grid>
        )
        return(
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Expand Take" tipClassName={classes.expandButton} > 
                    <UnfoldMore color = "primary" />
                </MyButton>
                <Dialog
                open ={this.state.open} onClose={this.handleClose} fullWidth maxWidth ="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
   
}
TakeDialog.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getTake: PropTypes.func.isRequired,
    takeId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    take: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    take: state.data.take,
    UI: state.UI
})

const mapActionsToProps = {
    getTake,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(TakeDialog));
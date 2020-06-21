import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import { logoutUser, uploadImage } from '../../redux/actions/userActions'
import EditDetails from './EditDetails.js'
import MyButton from '../../util/MyButton'

//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import MuiLink from '@material-ui/core/Link'
import Typography  from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'


//icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import Grade from '@material-ui/icons/Grade'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
import Autorenew from '@material-ui/icons/Autorenew'


const styles = (theme) => ({
    paper: {
      padding: 20,
      width: 400,
      textAlign: 'center',
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: theme.palette.primary.main
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
  })

class Profile extends Component {
    handleImageChange = (event) =>{
      const image = event.target.files[0] //selects first file for image
      const formData = new FormData();
      formData.append('image', image, image.name)
      this.props.uploadImage(formData); //utilizes redux to upload image
    }
    handleEditPicture =() =>{ //finds input to click
      const fileInput = document.getElementById('imageInput')
      fileInput.click(); //opens image selection on computer 
    }
    handleLogout = () =>{
      this.props.logoutUser();
    }
    render() {
        const {classes, user: {credentials:{handle, createdAt, imageUrl, bio, website, location, team}, loading, authenticated} } = this.props; //destructuring to obtain info for user's profile
        
        let profileMarkup = !loading ? 
        (authenticated ? ( //if user is authenticated, thier profile w/ needed info is shown
            <Paper className = {classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className ="profile-image"/>
                        <input type="file" id="imageInput" hidden ="hidden" onChange={this.handleImageChange} />

                        
                        <MyButton tip="Edit Profile Picture" onClick={this.handleEditPicture} btnClassName="button">
                          <EditIcon color="primary" />
                        </MyButton>
                    </div>  
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component = {Link} to = {`/users/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                        <hr/>
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr/>
                        {location && (
                            <Fragment>
                                <LocationOn color="primary" /> <span>{location}</span>
                                <hr/>
                            </Fragment>
                        )}
                        {website && (
                            <Fragment>
                                <LinkIcon color="primary" />
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                                <hr/>
                            </Fragment>
                        )}
                         {team && (
                            <Typography>
                                <Grade color="primary" /> <span>{team}</span>
                                <hr/>
                            </Typography>
                        )}
                        <hr/>
                        <CalendarToday color ="primary" /> {' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                    <MyButton tip="Logout" onClick={this.handleLogout}>
                          <KeyboardReturn color="primary" />
                        </MyButton>
                    <EditDetails />
                </div>
            </Paper>
        ) : ( //case if user is not authenticated
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Login or Signup
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">
                        Signup
                    </Button>
                </div>
            </Paper>
        )) : (<Autorenew />) //if loading, show loading paragraph, else check for authentication: if authenticated -> show profile, else throw error for no profile data
        
        return profileMarkup;
    }
}

const mapStateToProps = (state) =>({
    user: state.user
})

const mapActionsToProps = {logoutUser, uploadImage};

Profile.propTypes ={
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))

import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types';

//MUI 
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MyButton from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'

//Icons
import NotificationsIcon from '@material-ui/icons/Notifications'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'

//Redux 
import {connect} from 'react-redux'
import {markNotificationsRead} from '../../redux/actions/userActions'
import Tooltip from '@material-ui/core/ToolTip';

class Notifications extends Component {
    state={
        anchorEl: null
    }
    handleOpen = (event) => {
        this.setState({anchorEl: event.target})
    }
    handleClose = () =>{
        this.setState({anchorEl: null})
    }
    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notifications //way to connect to backend to only send the notifications that are unread 
            .filter(not => !not.read)
            .map(not => not.notificationId)
        this.props.markNotificationsRead(unreadNotificationsIds)
    }
    render(){
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;

        dayjs.extend(relativeTime)

        let notificationIcon

        if(notifications && notifications.length > 0){ //if we have notifications, then we have 2 types of notifications (read, unread) and assign color appropriatley
            notifications.filter(not => not.read === false).length > 0 ?   //only unread notifications
                notificationIcon = (
                    <Badge badgeContent={notifications.filter(not => not.read === false).length}
                        color = "seconday">
                            <NotificationsIcon />
                        </Badge>
                ): (
                    notificationIcon = <NotificationsIcon/>
                )
    }
        else{
            notificationIcon = <NotificationsIcon/>
        }

        let notificationsMarkup = 
            notifications && notifications.length > 0 ? (
                notifications.map(not => { //if we have notifications, loop through them and print appropriate response in notifications menu
                    const verb = not.type === 'like' ? 'Liked' : 'Commented On';  //whether someone liked or commented
                    const time = dayjs(not.createdAt).fromNow() //how long ago they interacted with your take 
                    const iconColor = not.read ? 'primary' : 'secondary' //depending on whether notification has been read, we give it a color
                    const icon = not.type === 'like' ? (
                        <FavoriteIcon color={iconColor} style={{marginRight: 10}} />
                    ) : (
                        <ChatIcon color={iconColor} style={{marginRight: 10}} />
                    )
                    return (
                        <MenuItem key={not.createdAt} onClick={this.handleClose}>
                            {icon}
                            <Typography
                                component={Link}
                                color="default"
                                variant="body1"
                                to={`/users/${not.recipient}/take/${not.takeId}`}>
                                    {not.sender} {verb} Your Take {time}
                                </Typography>
                        </MenuItem>
                    )
                })
            ): (
                <MenuItem onClick={this.handleClose} >
                    You Have No Notifications Yet
                </MenuItem>
            )

        return(
            <Fragment>
                <Tooltip placement="top" title="Notifications">
                    <MyButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup = "true"
                        onClick={this.handleOpen}>
                            {notificationIcon}
                        </MyButton>
                </Tooltip>
                <Menu 
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                onEntered={this.onMenuOpened}
                >
                    {notificationsMarkup}
                </Menu>
            </Fragment>
        )
}
}

Notifications.propTypes ={
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps,{markNotificationsRead})(Notifications)
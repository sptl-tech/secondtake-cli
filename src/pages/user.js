//Page for user's details 

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Take from '../components/take/Take'
import Grid from '@material-ui/core/Grid'
import {connect } from 'react-redux'
import { getUserData } from '../redux/actions/dataActions'
import StaticProfile from '../components/profile/StaticProfile'
import CircularProgress from '@material-ui/core/CircularProgress'

class user extends Component {
    state={
        profile: null
    }
    componentDidMount(){
        const handle = this.props.match.params.handle;
        this.props.getUserData(handle); //passes user handle to data reducer
        axios.get(`/user/${handle}`) //same GET request as data reducer function
            .then(res =>{
                this.setState({
                    profile: res.data.user
                })
            })
            .catch(err => console.log(err))
    }
    render() {
        const {takes, loading} = this.props.data

        const takesMarkup = loading ? ( 
            <CircularProgress size={200} thickness={2}/>
        ): takes === null ? ( //case if user has no takes
            <p>No Takes from this user</p>
        ) : (
            takes.map(take => <Take key={take.takeId} take = {take} />)
        )
        return (
            <Grid container spacing ={9}>
                <Grid item sm={8} xs={12}> 
                    {takesMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <CircularProgress size={100} thickness={2}/>
                    ): (
                        <StaticProfile profile={this.state.profile}/>
                    )}
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    data: state.data
})
export default connect(mapStateToProps, {getUserData})(user);

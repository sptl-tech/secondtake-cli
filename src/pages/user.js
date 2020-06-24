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
        profile: null,
        takeIdParam: null
    }
    componentDidMount(){
        const handle = this.props.match.params.handle;
        const takeId = this.props.match.params.takeId;

        if (takeId) this.setState({takeIdParam: takeId});
        this.props.getUserData(handle); //passes user handle to data reducer
        axios.get(`/user/${handle}`) //same GET request as data reducer function
            .then(res =>{
                this.setState({
                    profile: res.data.user
                })
            })
            .catch(err => console.log(err))
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.match !== this.props.match) {
          const takeId = nextProps.match.params.takeId;
          if (takeId)
            this.setState({ takeIdParam: takeId, openDialog: true });
        }
      }
    render() {
        const {takes, loading} = this.props.data
        const {takeIdParam} = this.state

        const takesMarkup = loading ? ( 
            <CircularProgress size={200} thickness={2}/>
        ): takes === null ? ( //case if user has no takes
            <p>No Takes from this user</p>
        ) : !takeIdParam ?(
            takes.map(take => <Take key={take.takeId} take = {take} />)
        ) : ( 
            takes.map(take => {
                if (take.takeId !== takeIdParam) //when we cannot find the take id we are trying to open
                    return <Take key={take.takeId} take = {take} />
                else return <Take key={take.takeId} take={take} openDialog />
            })
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

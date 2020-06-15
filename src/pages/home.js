import React, { Component } from 'react'
import axios from 'axios'
import Grid  from '@material-ui/core/Grid'

import Take from '../components/Take'
import Profile from '../components/Profile'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'
import {getTakes} from '../redux/actions/dataActions'
import Autorenew from '@material-ui/icons/Autorenew'


class home extends Component {
  
    componentDidMount(){ //send request to server to retreive our information using axios
        this.props.getTakes();
    }
    render() {
        const {takes, loading} = this.props.data;

        let recentTakesMarkup = !loading?(//if we aren't loading, then show takes
            takes.map((take) => <Take key ={take.takeId}take ={take}/>)
        )  : <Autorenew />
        return (
            <Grid container spacing ={9}>
                <Grid item sm={8} xs={12}> 
                    {recentTakesMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        );
    }
}

home.propTypes ={
    getTakes: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getTakes})(home) 
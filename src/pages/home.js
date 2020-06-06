import React, { Component } from 'react'
import axios from 'axios'
import Grid  from '@material-ui/core/Grid'
import Take from '../components/Take'
class home extends Component {
    state ={
        takes: null
    }
    componentDidMount(){ //send request to server to retreive our information using axios
        axios.get('/takes')
            .then( res =>{
                console.log(res.data)
                this.setState({
                    takes: res.data
                })
            })
            .catch(err => console.log(err));
    }
    render() {
        let recentTakesMarkup = this.state.takes?(//want to check if state of takes is null; if it is not, then it is still loading the takes
            this.state.takes.map(take => <Take take ={take}/>)
        )  : <p>Loading..</p>
        return (
            <Grid container spacing ={2}>
                <Grid item sm={8} xs={12}> 
                    {recentTakesMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile..</p>
                </Grid>
            </Grid>
        );
    }
}

export default home
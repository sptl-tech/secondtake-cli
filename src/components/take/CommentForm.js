//Form for submitting new comments
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

//MUI 
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

//Redux
import {connect} from 'react-redux'
import {submitComment} from '../../redux/actions/dataActions'
import { POST_TAKE } from '../../redux/types'
const styles = theme => ({
    ...theme.spread,
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
class CommentForm extends Component {
    state = { //initial state of comment form (default values)
        body: '',
        errors: {}
    }
    componentWillReceiveProps(nextProps){ 
        if(nextProps.UI.errors){ //checks if we have any errors
            this.setState({errors:nextProps.UI.errors})
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading){ //if there are no errors and the comment is submitted, then the form will clear
            this.setState({body: ''})
        }
    }
    handleChange = (event) =>{
        this.setState({ [event.target.name ]: event.target.value})
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.submitComment(this.props.takeId, {body: this.state.body});
    }
    
    render() {
        const {classes, authenticated} = this.props;
        const errors = this.state.errors;

        const commentFormMarkup = authenticated ? ( //if authenticated, we view the markup for form, else null
            <Grid item sm={12} style={{textAlign: 'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="body"
                        type="text"
                        label="Comment on Take"
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        value = {this.state.body}
                        onChange = {this.handleChange}
                        fullWidth
                        className={classes.textField}
                        />
                        <br/>
                        <br/>
                        <Button type="submit" 
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        >Submit</Button>
                </form>
                <hr className={classes.visibleSeperator} />
            </Grid>
        ): null
        return commentFormMarkup
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    takeId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
}
const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})
export default connect(mapStateToProps, {submitComment})(withStyles(styles)(CommentForm))

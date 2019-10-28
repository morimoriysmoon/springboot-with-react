import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import KeyboardOutlinedIcon from '@material-ui/icons/KeyboardOutlined';

const styles = {
    textfield: {
    },
    textFieldInputResult: {
        fontSize: '3rem',
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'right'
    },
    textFieldInputHistory: {
        fontSize: '1rem',
        textAlign: 'right'
    },    
    headerIcon: {
        fontSize: '8rem',
    },
    headerTitle: {
        fontSize: '2rem'
    }
};

class Display extends Component {
    render() {
        const { classes, displayText, history } = this.props;

        let historyText = '';
        history.forEach(element => { historyText += element + ' ' });

        return (
            <Fragment>
                <div>
                    <KeyboardOutlinedIcon className={classes.headerIcon}></KeyboardOutlinedIcon>
                </div>
                <TextField className={classes.textfield}
                    variant="outlined"
                    value={displayText}
                    margin="normal"
                    InputProps={{
                        classes: {
                            input: classes.textFieldInputResult
                        }
                    }}
                    fullWidth={true} label="Result">
                </TextField>
                <TextField className={classes.textfield}
                    //variant="filled"
                    value={historyText}
                    margin="normal"
                    InputProps={{
                        classes: {
                            input: classes.textFieldInputHistory
                        }
                    }}
                    fullWidth={true} label="History">
                </TextField>
            </Fragment>
        );
    }
}

export default withStyles(styles)(Display);
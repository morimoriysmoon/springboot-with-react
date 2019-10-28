import React, { Component, Fragment } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import { zeroPadding } from './Utils';

const styles = {
    formControl: {
        minWidth: 80
    }
};

class SecondSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            secondItems: [
                0, 1, 2, 3, 5, 6, 7, 8, 9,
                10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
                20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
                30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
                40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
                50, 51, 52, 53, 54, 55, 56, 57, 58, 59
            ]
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.resetValue = this.resetValue.bind(this);        
    }

    handleOnChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        });
        this.props.onChange('sec', event.target.value);
    }

    resetValue() {
        this.setState({
            seconds: 0
        });                
    }

    render() {

        const { classes } = this.props;

        return (
            <Fragment>
                <FormControl className={classes.formControl} disabled={this.props.disabled}>
                    <InputLabel htmlFor="seconds-simple">Seconds</InputLabel>
                    <Select
                        value={this.state.seconds}
                        onChange={this.handleOnChange}
                        inputProps={{
                            name: 'seconds',
                            id: 'seconds-simple'
                        }}
                    >
                        {
                            this.state.secondItems.map((item, index) => <MenuItem value={item} key={index}>{zeroPadding(item, 2)}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Fragment>
        )
    };
}

export default withStyles(styles)(SecondSelect);
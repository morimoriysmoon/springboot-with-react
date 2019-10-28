import React, { Component, Fragment } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import { zeroPadding } from './Utils';

const styles = {
    formControl: {
        minWidth: 80
    }
};

class HourSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hours: 0,
            hourItems: [
                0, 1, 2, 3, 5, 6, 7, 8, 9,
                10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
                20, 21, 22, 23
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
        this.props.onChange('hour', event.target.value);
    }

    resetValue() {
        this.setState({
            hours: 0
        });
    }

    render() {

        const { classes } = this.props;

        return (
            <Fragment>
                <FormControl className={classes.formControl} disabled={this.props.disabled}>
                    <InputLabel htmlFor="hours-simple">Hours</InputLabel>
                    <Select
                        value={this.state.hours}
                        onChange={this.handleOnChange}
                        inputProps={{
                            name: 'hours',
                            id: 'hours-simple'
                        }}
                    >
                        {
                            this.state.hourItems.map((item, index) => <MenuItem value={item} key={index}>{zeroPadding(item, 2)}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Fragment>
        )
    };
}

export default withStyles(styles)(HourSelect);
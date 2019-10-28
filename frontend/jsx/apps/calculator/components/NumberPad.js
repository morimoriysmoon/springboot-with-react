import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import './Common.css';

class NumberPad extends Component {
    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(e) {
        const { letter, onClick } = this.props;
        onClick(letter);
    }

    render() {
        const { letter, disabled } = this.props;

        return (
            <span>
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    fullWidth={true}
                    onClick={this.handleOnClick}
                    disabled={disabled}
                >
                    <span className='letter'>{letter}</span>
                </Button>
            </span>
        );
    }
}

export default NumberPad;
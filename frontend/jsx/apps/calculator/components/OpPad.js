import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import './Common.css'

class OpPad extends Component {
    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(e) {
        const { letter, onClick } = this.props;
        onClick(letter === 'x' ? '*' : letter);
    }

    render() {
        const { letter, disabled } = this.props;
        return (
            <span>
                <Button
                    variant="outlined"
                    color="secondary"
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

export default OpPad;
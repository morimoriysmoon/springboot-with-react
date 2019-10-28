import React, {Component} from "react";
import Container from "@material-ui/core/Container";

import MenuWrapper from '../menu/MenuWrapper'
import Timer from './components/Timer';

class TimerWrapper extends Component {
    constructor(props) {
        super(props);
        this.handleOnTimeout = this.handleOnTimeout.bind(this);
    }

    handleOnTimeout() {
        alert("TIME-OUT!!!");
    }

    render() {
        return (
            <MenuWrapper>
                <Container maxWidth="sm">
                    <Timer onTimeout={this.handleOnTimeout}/>
                </Container>
            </MenuWrapper>
        )
    }
}

export default TimerWrapper;
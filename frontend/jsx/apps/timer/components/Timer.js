import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import HourSelect from './HourSelect';
import MinuteSelect from './MinuteSelect';
import SecondSelect from './SecondSelect';
import { combineHMSToString } from './Utils';
import VersionDisp from '../../common/VersionDisp';

import AvTimerIcon from '@material-ui/icons/AvTimer';
import { withStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';

import moment from 'moment';

const intervalTime = 200; // ms

const styles = {
    headerIcon: {
        fontSize: '4rem',
    },
    textFieldInputResult: {
        fontSize: '5rem',
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center'
    },
};

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            started: false,
            hour: 0,
            min: 0,
            sec: 0,
            durationText: '00:00:00',
            timeOutId: null,
            intervalId: null,
            momentDuration: null
        };
        this.handleOnClickStart = this.handleOnClickStart.bind(this);
        this.handleOnClickReset = this.handleOnClickReset.bind(this);
        this.handleOnTimeChanged = this.handleOnTimeChanged.bind(this);

        this.callbackInterval = this.callbackInterval.bind(this);

        // child의 특정 method에 접근하기 위해서 ref 사용
        this.hourSelect = React.createRef();
        this.minSelect = React.createRef();
        this.secSelect = React.createRef();
    }

    handleOnClickStart(event) {

        const { hour, min, sec, started } = this.state;
        const { timeOutId, intervalId } = this.state;

        if (hour === 0 && min === 0 && sec === 0) {
            alert('올바른 시간을 설정해 주세요.')
            return;
        }

        if (started) { // to stop
            this.setState({
                ...this.state,
                started: false
            });

            if (timeOutId) {
                clearTimeout(timeOutId);
            }

            if (intervalId) {
                clearInterval(intervalId);
            }

        } else { // to start
            const momentDuration = moment.duration({
                hours: hour,
                minutes: min,
                seconds: sec
            });
            //console.log(momentDuration);

            // interval 생성
            const intervalId = setInterval(this.callbackInterval, intervalTime);

            this.setState({
                ...this.state,
                started: true,
                momentDuration: momentDuration,
                intervalId: intervalId
            });
        }
    }

    callbackInterval() {
        //console.log("[callbackInterval] called");

        const { momentDuration, intervalId } = this.state;
        const { onTimeout } = this.props;

        let subbed = momentDuration.subtract(intervalTime, 'ms');
        //console.log(subbed);

        if (subbed.asMilliseconds() < intervalTime) {
            if (intervalId) {
                clearInterval(intervalId);
            }

            this.setState({
                started: false,
                hour: 0,
                min: 0,
                sec: 0,
                durationText: '00:00:00',
                timeOutId: null,
                intervalId: null,
                momentDuration: null
            });

            this.hourSelect.current.resetValue();
            this.minSelect.current.resetValue();
            this.secSelect.current.resetValue();

            // 타이머 종료를 알린다.
            onTimeout();
            return;
        }

        this.setState({
            momentDuration: subbed,
            hour: subbed.hours(),
            min: subbed.minutes(),
            sec: subbed.seconds(),
            durationText: combineHMSToString(subbed.hours(), subbed.minutes(), subbed.seconds())
        });
    }

    handleOnClickReset(event) {
        this.setState({
            started: false,
            hour: 0,
            min: 0,
            sec: 0,
            durationText: '00:00:00',
            timeOutId: null,
            intervalId: null,
            momentDuration: null
        });

        this.hourSelect.current.resetValue();
        this.minSelect.current.resetValue();
        this.secSelect.current.resetValue();
    }

    handleOnTimeChanged(type, value) {
        //console.log(type + ':' + value);
        switch (type) {
            case 'hour':
                this.setState({ hour: value, durationText: combineHMSToString(value, this.state.min, this.state.sec) });
                break;
            case 'min':
                this.setState({ min: value, durationText: combineHMSToString(this.state.hour, value, this.state.sec) });
                break;
            case 'sec':
                this.setState({ sec: value, durationText: combineHMSToString(this.state.hour, this.state.min, value) });
                break;
            default:
                break;
        }
    }

    componentWillUnmount() {

        const { timeOutId, intervalId } = this.state;

        if (timeOutId) {
            clearTimeout(timeOutId);
        }

        if (intervalId) {
            clearInterval(intervalId);
        }
    }

    render() {

        const disabled = this.state.started;
        const { durationText } = this.state;
        const { classes } = this.props;

        return (
            <Fragment>
                <form>
                    <Grid container alignContent="center" alignItems="center" spacing={3}>
                        <Grid item xs={2}><AvTimerIcon className={classes.headerIcon}></AvTimerIcon></Grid>
                        <Grid item xs={2}><HourSelect ref={this.hourSelect} disabled={disabled} onChange={this.handleOnTimeChanged} /></Grid>
                        <Grid item xs={2}><MinuteSelect ref={this.minSelect} disabled={disabled} onChange={this.handleOnTimeChanged} /></Grid>
                        <Grid item xs={2}><SecondSelect ref={this.secSelect} disabled={disabled} onChange={this.handleOnTimeChanged} /></Grid>
                        <Grid item xs={4}>
                            <Button variant="contained"
                                color={this.state.started ? "secondary" : "primary"}
                                size="small"
                                onClick={this.handleOnClickStart}>
                                {this.state.started ? 'STOP' : 'START'}
                            </Button>
                            {' '}
                            <Button variant="contained"
                                size="small"
                                onClick={this.handleOnClickReset}
                                disabled={disabled}>
                                Reset
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined" fullWidth={true}
                                value={durationText}
                                InputProps={{
                                    classes: {
                                        input: classes.textFieldInputResult
                                    }
                                }}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <VersionDisp versionNo="0.0.1"/>
                        </Grid>
                    </Grid>
                </form>
            </Fragment>
        )
    }
}

export default withStyles(styles)(Timer);
import React, { Component } from 'react';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';

import NumberPad from './components/NumberPad';
import ClearPad from './components/ClearPad';
import OpPad from './components/OpPad';
import Display from './components/Display';
import VersionDisp from '../common/VersionDisp';

import saferEval from 'safer-eval';
import MenuWrapper from "../menu/MenuWrapper";

class CalculatorWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lettersEntered: '',
            numbersOps: [],
            calculated: false
        };

        this.handleOnNumPadClick = this.handleOnNumPadClick.bind(this);
        this.handleOpPadClick = this.handleOpPadClick.bind(this);
        this.handleOnClearClick = this.handleOnClearClick.bind(this);
    }

    handleOnNumPadClick(letter) {
        this.setState({ lettersEntered: this.state.lettersEntered + letter });
    }

    handleOnClearClick() {
        this.setState({ lettersEntered: '', numbersOps: [], calculated: false });
    }

    handleOpPadClick(op) {
        if (this.state.lettersEntered.length === 0 && this.state.numbersOps.length === 0) {
            alert('숫자를 먼저 입력하세요.')
            return;
        }

        switch (op) {
            case '+':
            case '-':
            case '*':
            case '/':
                if (this.state.lettersEntered.length > 0) {
                    let newList = this.state.numbersOps.slice();
                    let number = Number(this.state.lettersEntered);
                    newList.push(number.toString());

                    if (newList.length !== 1) {
                        newList = ['(', ...newList, ')']; // wrap with ()
                    }

                    newList.push(op);
                    this.setState({ lettersEntered: '', numbersOps: newList });
                } else {
                    alert("형식에 맞지 않는 계산식입니다.");
                }
                break;
            case '=':
                if (this.state.lettersEntered.length > 0) {
                    let newList = this.state.numbersOps.slice();

                    let number = Number(this.state.lettersEntered);
                    newList.push(number.toString());

                    // 연산
                    let evalText = '';
                    newList.forEach(item => { evalText += item; });

                    // 결과 표시
                    let result = saferEval(evalText);
                    this.setState({ numbersOps: newList, lettersEntered: result, calculated: true });
                } else {
                    alert("연속된 연산자는 처리 불가합니다.");
                }
                break;
            default:
                break;
        }
    }

    render() {
        const { lettersEntered, numbersOps, calculated } = this.state;
        return (
            <MenuWrapper>
                <Container maxWidth="sm">
                    <Grid container alignContent="center" alignItems="center" spacing={3}>
                        <Grid item xs={12}>
                            <Display displayText={lettersEntered} history={numbersOps} />
                        </Grid>
                        <Grid item xs={3}><NumberPad letter='1' onClick={this.handleOnNumPadClick} disabled={calculated} /></Grid>
                        <Grid item xs={3}><NumberPad letter='2' onClick={this.handleOnNumPadClick} disabled={calculated} /></Grid>
                        <Grid item xs={3}><NumberPad letter='3' onClick={this.handleOnNumPadClick} disabled={calculated} /></Grid>
                        <Grid item xs={3}><OpPad letter='+' onClick={this.handleOpPadClick} disabled={calculated} /></Grid>

                        <Grid item xs={3}><NumberPad letter='4' onClick={this.handleOnNumPadClick} disabled={calculated} /></Grid>
                        <Grid item xs={3}><NumberPad letter='5' onClick={this.handleOnNumPadClick} disabled={calculated} /></Grid>
                        <Grid item xs={3}><NumberPad letter='6' onClick={this.handleOnNumPadClick} disabled={calculated} /></Grid>
                        <Grid item xs={3}><OpPad letter='-' onClick={this.handleOpPadClick} disabled={calculated} /></Grid>

                        <Grid item xs={3}><NumberPad letter='7' onClick={this.handleOnNumPadClick} disabled={calculated} /></Grid>
                        <Grid item xs={3}><NumberPad letter='8' onClick={this.handleOnNumPadClick} disabled={calculated} /></Grid>
                        <Grid item xs={3}><NumberPad letter='9' onClick={this.handleOnNumPadClick} disabled={calculated} /></Grid>
                        <Grid item xs={3}><OpPad letter='*' onClick={this.handleOpPadClick} disabled={calculated} /></Grid>

                        <Grid item xs={3}><NumberPad letter='0' onClick={this.handleOnNumPadClick} disabled={calculated} /></Grid>
                        <Grid item xs={3}><ClearPad onClick={this.handleOnClearClick} /></Grid>
                        <Grid item xs={3}><OpPad letter='=' onClick={this.handleOpPadClick} disabled={calculated} /></Grid>
                        <Grid item xs={3}><OpPad letter='/' onClick={this.handleOpPadClick} disabled={calculated} /></Grid>

                        <Grid item xs={3}><VersionDisp versionNo='0.0.1'/></Grid>
                    </Grid>

                </Container >
            </MenuWrapper>
        );
    }
}

export default CalculatorWrapper;
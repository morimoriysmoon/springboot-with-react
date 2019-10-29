import React, {useRef} from 'react';
import {render} from 'react-dom';
import {Formik, Field, Form} from 'formik';
import {
    fieldToTextField,
    TextField,
    TextFieldProps,
    Select,
    Switch,
} from 'formik-material-ui';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiTextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function LoginFormikWrapper(props) {
    const classes = useStyles();
    const {error, logout, action} = props;
    //const formEl = useRef(null);

    return (
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            validate={values => {
                console.log('[validate] called');
                const errors = {};
                if (!values.username) {
                    errors.username = 'Required';
                }
                if (!values.password) {
                    errors.password = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
                console.log('[onSubmit] called');
                //formEl.current.submit(); // ISSUE : post request parameters 없기 때문에 사용불가!
            }}
            render={({submitForm, isSubmitting, values, setFieldValues}) => (
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Form className={classes.form}>
                            {/*<form className={classes.form} method={"POST"} action={action} ref={formEl}>*/}
                            <Field
                                name={'username'}
                                type={'text'}
                                label={'Username'}
                                component={TextField}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                autoFocus
                            />
                            <Field
                                name={'password'}
                                type={'password'}
                                label={'Password'}
                                component={TextField}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}
                                className={classes.submit}
                            >
                                Sign In
                            </Button>

                            <Typography variant="h6" color="secondary" align={'center'}>
                                {error !== null ? 'Your username or password is invalid.' : ''}
                            </Typography>

                            <Typography variant="h6" color="primary" align={'center'}>
                                {logout !== null ? 'You have been logged out successfully.' : ''}
                            </Typography>

                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                            </Grid>
                            {/*</form>*/}
                        </Form>
                    </div>
                    <Box mt={8}>
                        <Copyright/>
                    </Box>
                </Container>
            )}
        />
    );
}
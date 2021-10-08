import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./auth-reducer";
import {Redirect} from "react-router-dom";
import {AppRootStateType} from "../../app/store";


export const Login = () => {
    const isLogged = useSelector<AppRootStateType, boolean>((state) => state.auth.isLogged)

    const dispatch = useDispatch()

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            }
            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: ''
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    })

    if(isLogged){
        return <Redirect to={'/'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField id="email"
                                   type="email"
                                   margin={'normal'}
                                   {...formik.getFieldProps('email')}/>
                        {formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField id="password"
                                   type="password"
                                   margin={'normal'}
                                   {...formik.getFieldProps('password')}/>
                        {formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel label={'Remember me'} control={<Checkbox
                            {...formik.getFieldProps('rememberMe')}
                            checked={formik.values.rememberMe}/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}

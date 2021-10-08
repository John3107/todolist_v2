import React, {useCallback, useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializedTC, RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import {Login} from "../components/Login/Login";
import {CircularProgress} from "@mui/material";
import {isLoggedAC, logoutTC} from "../components/Login/auth-reducer";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializedTC())
    }, [])


    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const initialized = useSelector<AppRootStateType, boolean>((state) => state.app.initialized)
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.auth.isLogged)

    const logoutHandler = useCallback(() => {
        console.log('.................................')
        dispatch(logoutTC())
    }, [])


    if (!initialized) {
        return <div style={{marginTop: '200px', marginLeft: '550px'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        {isLogged && <Button color="inherit"
                                             onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                </Container>
            </div>
        </BrowserRouter>
    )
}

export default App

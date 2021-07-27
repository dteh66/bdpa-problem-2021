import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
    Paper,
    TextField,
    Button,
    Typography,
    Checkbox,
} from '@material-ui/core';

function Login(props) {
    const [form, setForm] = useState({
        login: '',
        password: '',
        remember: false,
    });
    const [error, setError] = useState('');
    const history = useHistory();
    const API_URL = process.env.REACT_APP_APIURL

    // If token cookie already exists, delete token and cookie
    useEffect(() => {
        if (Cookies.get('token')) {
            async function logout() {
                await axios
                    .delete(`/auth/delete-token?token=${Cookies.get('token')}`)
                    .catch((e) => {
                        console.log(e);
                    });
            }
            logout();
            Cookies.remove('token');
        }
    }, [history]);

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setForm(() => {
            return { ...form, [name]: value };
        });
    }

    function handleCheckboxChange(e) {
        const name = e.target.name;
        const value = e.target.checked;
        setForm(() => {
            return { ...form, [name]: value };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(() => '');
        await axios
            .post(API_URL + '/auth/generate-token/', form)
            .then((response) => {
                Cookies.set('token', response.data.token, {
                    expires: form.remember ? null : 1 / 24,
                });
                history.push('/');
            })
            .catch((error) => {
                console.log(error)
                //setError(() => error.response.data);
            });
    }

    return (
        <Paper>
            <form onSubmit={handleSubmit}>
                <Typography variant='h3'>Login</Typography>
                <TextField
                    required
                    fullWidth
                    label='Username or Email'
                    name='login'
                    variant='outlined'
                    onChange={handleChange}
                    value={form.login}
                    autoFocus
                />
                <TextField
                    required
                    fullWidth
                    label='Password'
                    name='password'
                    variant='outlined'
                    onChange={handleChange}
                    value={form.password}
                    type='password'
                />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant='body1'>Remember Me</Typography>
                    <Checkbox
                        onChange={handleCheckboxChange}
                        name='remember'
                        value={form.remember}
                    />
                </div>
                {error && (
                    <Typography variant='body2' color='secondary'>
                        {error}
                    </Typography>
                )}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant='body1'>
                        Dont have an account?{' '}
                        <Link to='/register'>Register</Link>
                    </Typography>
                    <Button
                        variant='contained'
                        style={{ margin: '0.5rem' }}
                        type='submit'
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Paper>
    );
}

export default Login;

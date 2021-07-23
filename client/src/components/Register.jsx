import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { Paper, TextField, Button, Typography } from '@material-ui/core';

function Register(props) {
    const [form, setForm] = useState({
        username: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        captcha: '',
    });
    const [error, setError] = useState('');
    const history = useHistory();

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setForm(() => {
            return { ...form, [name]: value };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(() => '');
        await axios
            .post('/auth/create-user/', form)
            .then((response) => {
                history.push('/login');
            })
            .catch((error) => {
                setError(() => error.response.data);
            });
    }

    return (
        <Paper>
            <form onSubmit={handleSubmit}>
                <Typography variant='h3'>Create an Account</Typography>

                <TextField
                    required
                    fullWidth
                    label='Username'
                    name='username'
                    variant='outlined'
                    onChange={handleChange}
                    value={form.username}
                    autoFocus
                />
                <TextField
                    required
                    fullWidth
                    label='Full Name'
                    name='fullName'
                    variant='outlined'
                    onChange={handleChange}
                    value={form.fullName}
                    autoFocus
                />
                <TextField
                    required
                    fullWidth
                    label='Email'
                    name='email'
                    variant='outlined'
                    onChange={handleChange}
                    value={form.email}
                    type='email'
                />
                <TextField
                    required
                    fullWidth
                    label='Phone Number'
                    name='phoneNumber'
                    variant='outlined'
                    onChange={handleChange}
                    value={form.phoneNumber}
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
                <TextField
                    required
                    fullWidth
                    label='Confirm Password'
                    name='confirmPassword'
                    variant='outlined'
                    onChange={handleChange}
                    value={form.confirmPassword}
                    type='password'
                />
                <TextField
                    required
                    fullWidth
                    label='What is 2 + 2?'
                    name='captcha'
                    variant='outlined'
                    onChange={handleChange}
                    value={form.captcha}
                />
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
                        Already Have an Account? <Link to='/login'>Login</Link>
                    </Typography>
                    <Button
                        variant='contained'
                        style={{ margin: '0.5rem' }}
                        type='submit'
                        disabled={
                            form.password !== form.confirmPassword ||
                            form.captcha !== '4'
                        }
                    >
                        Register
                    </Button>
                </div>
            </form>
        </Paper>
    );
}

export default Register;

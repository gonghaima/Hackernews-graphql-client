import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom'

const LOGIN = gql`
  mutation Signup($email: String!, $password: String!) {
    login(email: $email, password: $password){
        token
        user{
            name
            email
            id
        }
    }
}
`;

export default () => {
    const [details, setDetails] = useState({ email: '', password: '' });
    const [login, { loading: mutationLoading, error: mutationError, data }] = useMutation(LOGIN, { errorPolicy: 'all' });
    const { email, password } = details;

    const setName = (updatedProp) => {
        const newState = { ...details, ...updatedProp };
        setDetails(newState);
    }

    if (mutationLoading) return <p>Loading...</p>;
    if (mutationError) return <p>Error :(</p>;
    if (data) return <Redirect to="/" />;

    const loginUser = (e) => {
        e.preventDefault();
        login({ variables: { email, password } });
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <input type="email" value={email} placeholder="Your email"
                    onChange={e => setName({ email: e.target.value })} required />
                <input type="password" value={password} placeholder="Your password"
                    onChange={e => setName({ password: e.target.value })} required />
                <input type="submit" />
            </form>
        </>
    )

}
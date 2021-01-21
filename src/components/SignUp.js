import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom'

const SIGN_UP = gql`
  mutation Signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name){
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
    const [details, setDetails] = useState({ email: '', password: '', name: '' });
    const [signup, { loading: mutationLoading, error: mutationError, data },] = useMutation(SIGN_UP);
    const { email, password, name } = details;

    const setName = (updatedProp) => {
        const newState = { ...details, ...updatedProp };
        setDetails(newState);
    }

    if (mutationLoading) return <p>Loading...</p>;
    if (mutationError) return <p>Error :(</p>;
    if (data) {
        console.log('setting up localstorage...');
        localStorage.setItem("AUTH_TOKEN", data.signup.token);
        return <Redirect to="/" />
    };

    const signupNewUser = (e) => {
        e.preventDefault();
        signup({ variables: { email, password, name } });
    }

    return (
        <>
            <h1>Sign up</h1>
            <form onSubmit={signupNewUser}>
                <input type="text" value={name} placeholder="Your name"
                    onChange={e => setName({ name: e.target.value })} required />
                <input type="email" value={email} placeholder="Your email"
                    onChange={e => setName({ email: e.target.value })} required />
                <input type="password" value={password} placeholder="Choose a safe password"
                    onChange={e => setName({ password: e.target.value })} required />
                <input type="submit" />
            </form>
        </>
    )

}
import React, { useState, useEffect } from 'react';
import LinkList from './LinkList';
import Notification from './Notification';

export default () => {
    const [token, setToken] = useState(null);
    useEffect(() => {
        setToken(localStorage.getItem("AUTH_TOKEN"))
    }, [token]);
    return (token && <>
        <LinkList />
        <Notification />
    </>)
}
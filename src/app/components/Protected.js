import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Protected= ({isLoggedIn, children}) => {
    let navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    })

    if (!isLoggedIn) {
        console.log("Not logged in");

    } else {
        return (
            <>
                {children}
            </>
        )
    }    
}
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn,setUserAccount } from '../../features/post/postsSlice';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [passphrase, setPassphrase] = useState('');
    const [errorVisible, setErrorVisible] = useState('hidden-message');
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const AccountLogin = async (event) => {
        event.preventDefault();
        await fetch("/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({  
                username: username,
                passphrase: passphrase,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.success) {
                setErrorVisible('hidden-message');
                dispatch(logIn());
                dispatch(setUserAccount(username));
                setUsername('');
                setPassphrase('');
                navigate("/");
            } else {
                setErrorVisible('visible-message');
            }
        })
    }

    return (
    <Row>
        <Col>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <form id="login-form" onSubmit={AccountLogin}>
                    <fieldset className="d-flex flex-column justify-content-center align-items-center">
                        <legend className="login-element text-center">LOGIN</legend>
                        <div>
                            <label className="login-element" htmlFor="username">Username</label>
                            <input type="text" minLength="3" name="username" id="username" onChange={(event) => setUsername(event.target.value)}/>
                        </div>
                        <div className="my-3">
                            <label className="login-element" htmlFor="passphrase">Password&nbsp;</label>
                            <input type="password" minLength="3" name="passphrase" id="passphrase" onChange={(event) => setPassphrase(event.target.value)}/>
                        </div>
                        <button className="pill-button" type="submit">Sign in</button>
                    </fieldset>
                </form>
                <a href="/create-account">Create an account</a>
                <p><span className={errorVisible}>Invalid username or password</span></p>
            </div>
        </Col>
    </Row>
    )
}
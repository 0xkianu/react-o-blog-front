import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

export const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [passphrase, setPassphrase] = useState('');
    const [errorVisible, setErrorVisible] = useState('hidden-message');
    let navigate = useNavigate();

    const AccountCreate = async (event) => {
        event.preventDefault();
        await fetch("/create_account", {
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
                navigate("/login");
            } else {
                setErrorVisible('visible-message');
            }
        })
    }

    return (
    <Row>
        <Col>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <form id="login-form" onSubmit={AccountCreate}>
                    <fieldset className="d-flex flex-column justify-content-center align-items-center">
                        <legend className="login-element text-center">Create Account</legend>
                        <div>
                            <label className="login-element" htmlFor="username">Username</label>
                            <input type="text" name="username" id="username" onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="my-3">
                            <label className="login-element" htmlFor="passphrase">Password&nbsp;</label>
                            <input type="password" name="passphrase" id="passphrase" onChange={(event) => setPassphrase(event.target.value)}/>
                        </div>
                        <button className="pill-button" type="submit">Create</button>
                    </fieldset>
                </form>
                <p><span className={errorVisible}>Invalid username or password</span></p>
            </div>
        </Col>
    </Row>
    )
}
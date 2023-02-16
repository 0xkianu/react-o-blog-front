import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Login = () => {
    return (
    <Row>
        <Col>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <form id="login-form">
                    <fieldset className="d-flex flex-column justify-content-center align-items-center">
                        <legend className="login-element text-center">LOGIN</legend>
                        <div>
                            <label className="login-element" for="username">Username</label>
                            <input type="text" name="username" id="username" />
                        </div>
                        <div className="my-3">
                            <label className="login-element" for="passphrase">Password&nbsp;</label>
                            <input type="password" name="passphrase" id="passphrase" />
                        </div>
                        <button className="pill-button" type="submit">Sign in</button>
                    </fieldset>
                </form>
                <a href="#">Create an account</a>
            </div>
        </Col>
    </Row>
    )
}
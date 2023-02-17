import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPost, logOut } from '../../features/post/postsSlice';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { Pen } from 'react-bootstrap-icons';
import { Save } from 'react-bootstrap-icons';

export const PostForm = ()=> {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [buttonType, setButtonType] = useState('publish-button');
    const [isPublished, setIsPublished] = useState(false);
    let navigate = useNavigate();

    const dispatch = useDispatch();

    const saveForm = async (event) => {
        event.preventDefault();
        await fetch('/blog/newpost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                content: body,
                isPublished: isPublished,
            }),
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.isLoggedIn) {
                dispatch(addPost(json.post));
            } else {
                dispatch(logOut());
            } 
            setTitle("");
            setBody("");
            setButtonType("publish-button");
            setIsPublished(false);
            navigate("/");
        })
        
    }

    const setPublished = () => {
        setButtonType(buttonType==='publish-button' ? 'pill-button':'publish-button'); 
        setIsPublished(!isPublished);
    }

    return (
      <Row className="row" id="content-row">
        <Col xs={10} className="col-10 link-column">
            <Row>
                <Form.Floating className="my-3">
                    <Form.Control type="text" placeholder="post title" aria-label="TITLE" id="postTitle" name="postTitle" onChange={(event) => setTitle(event.target.value)}></Form.Control>
                    <label for="postTitle" className="mx-3">Title</label>
                </Form.Floating >
            </Row>
            <Row>
                <Form.Floating className="my-3">
                    <Form.Control as="textarea" style={{height: "500px"}} placeholder="post content" id="postContent" name="postContent" onChange={(event) => setBody(event.target.value)}></Form.Control> 
                </Form.Floating>
            </Row>
        </Col>
        <Col xs={2}>
            <Row className="m-3">
                <button className={"post-button-publish "+buttonType} onClick={setPublished}><Pen className="icon" /> PUBLISH</button>
            </Row>
            <Row className="m-3">
                <button className={"pill-button post-button-save"} onClick={saveForm}><Save className="icon" /> SAVE</button>
            </Row>
        </Col>
      </Row>
    )
}
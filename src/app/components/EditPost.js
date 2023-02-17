import { React, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts, logOut } from '../../features/post/postsSlice';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pen } from 'react-bootstrap-icons';
import { Save } from 'react-bootstrap-icons';

export const EditPost = ()=> {
    let { postID } = useParams();
    const posts = useSelector(selectAllPosts);
    const dispatch = useDispatch();

    const [title, setTitle] = useState(posts[postID].title);
    const [body, setBody] = useState(posts[postID].body);
    const [buttonType, setButtonType] = useState(posts[postID].isPublished ? 'pill-button' : 'publish-button');
    const [isPublished, setIsPublished] = useState(posts[postID].isPublished);

    let navigate = useNavigate();

    const saveForm = async (event) => {
        event.preventDefault();
        await fetch('/blog/editpost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postID: posts[postID].id,
                title: title,
                content: body,
                isPublished: isPublished,
            }),
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.isLoggedIn) {
                console.log('Success:', json);
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
                    <Form.Control type="text" placeholder="post title" aria-label="TITLE" id="postTitle" name="postTitle" defaultValue={title} onChange={(event) => setTitle(event.target.value)}></Form.Control>
                    <label for="postTitle" className="mx-3">Title</label>
                </Form.Floating >
            </Row>
            <Row>
                <Form.Floating className="my-3">
                    <Form.Control as="textarea" style={{height: "500px"}} placeholder="post content" id="postContent" name="postContent" defaultValue={body} onChange={(event) => setBody(event.target.value)}></Form.Control> 
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
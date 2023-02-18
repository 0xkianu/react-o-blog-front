import { React, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPost, logOut } from '../../features/post/postsSlice';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { Pen } from 'react-bootstrap-icons';
import { Save } from 'react-bootstrap-icons';
import { Editor } from '@tinymce/tinymce-react';

export const PostForm = ()=> {
    const [title, setTitle] = useState('');
    const [buttonType, setButtonType] = useState('publish-button');
    const [isPublished, setIsPublished] = useState(false);
    const editorRef = useRef(null);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const saveForm = async (event) => {
        event.preventDefault();
        let bodyString = '';

        if (editorRef.current) {
            bodyString = editorRef.current.getContent();
        }

        await fetch('/blog/newpost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                content: bodyString,
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
                    <label htmlFor="postTitle" className="mx-3">Title</label>
                </Form.Floating >
            </Row>
            <Row>
                <Editor
                    apiKey='6w8klk4zkiuj20zwr9ky9ouc296j0k0vtl01zb1ju713ddm6'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue=""
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
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
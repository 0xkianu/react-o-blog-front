import { React, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts, logOut } from '../../features/post/postsSlice';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pen } from 'react-bootstrap-icons';
import { Save } from 'react-bootstrap-icons';
import { Editor } from '@tinymce/tinymce-react';

export const EditPost = ()=> {
    let { postID } = useParams();
    const posts = useSelector(selectAllPosts);
    const dispatch = useDispatch();
    const editorRef = useRef(null);

    const [title, setTitle] = useState(posts[postID].title);
    const [buttonType, setButtonType] = useState(posts[postID].isPublished ? 'pill-button' : 'publish-button');
    const [isPublished, setIsPublished] = useState(posts[postID].isPublished);

    let navigate = useNavigate();

    const saveForm = async (event) => {
        event.preventDefault();

        let bodyString = '';

        if (editorRef.current) {
            bodyString = editorRef.current.getContent();
        }

        await fetch('/blog/editpost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postID: posts[postID].id,
                title: title,
                content: bodyString,
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
                <Editor
                    apiKey='6w8klk4zkiuj20zwr9ky9ouc296j0k0vtl01zb1ju713ddm6'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={posts[postID].body}
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
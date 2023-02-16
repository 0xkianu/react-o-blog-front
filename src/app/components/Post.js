import React from 'react';
import { NavLink } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import { Eye } from 'react-bootstrap-icons';
import { TrashFill } from 'react-bootstrap-icons';
import { Pencil } from 'react-bootstrap-icons';


export const Post = ({post, removePostById, index}) => {
    return (
        <Card className="my-3" style={{width: "80%", height: "10%"}}>
          <Row className="g-0">
            <Col md={4}>
              <span className="mx-3" id="post-letter">{post.title[0]}</span>
            </Col>
            <Col md={4}>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text><small className="text-muted">Last updated {post.updatedAt}</small></Card.Text>
              </Card.Body>
            </Col>
            <Col md={4} className="d-flex flex-row justify-content-end align-items-center">  
                <NavLink to={"/blog-post/"+index}><button className="mx-3 post-button" id={post.id}><Eye className="icon"/></button></NavLink>
				        <button className="mx-3 post-button" id={post.id} onClick={() => removePostById(post.id)}><TrashFill className="icon"/></button>
                <NavLink to={"/edit-post/"+index}><button className="mx-3 post-button" id={post.id}><Pencil className="icon"/></button></NavLink>
            </Col>
          </Row>
        </Card>
    )
}

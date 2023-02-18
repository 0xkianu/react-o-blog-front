import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import parse from 'html-react-parser';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

export const BlogPost = ({post}) => {
    return (
        <Card className="my-3" style={{width: "80%"}}>
          <Row className="g-0">
            <Card.Body>
              <Card.Title className="post-title text-center">{post.title}</Card.Title>
              <Card.Text className="text-center"><small className="text-muted">Last updated {post.updatedAt}</small></Card.Text>
              <Card.Body>
                <Card.Text className="post-body mx-5">{parse(post.body)}</Card.Text>
              </Card.Body>
            </Card.Body>
          </Row>
        </Card>
    )
}
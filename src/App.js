import React from 'react';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import { PostList } from './app/components/PostList';
import { Blog } from './app/components/Blog';
import { PostForm } from './app/components/PostForm';
import { EditPost } from './app/components/EditPost';
import { SingleBlogPost } from './app/components/SingleBlogPost';
import { Login } from './app/components/Login';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MBlogo from './images/MB.jpg';
import MBlogo2 from './images/MYBLOG.jpg'
import { FileEarmarkFill } from 'react-bootstrap-icons';
import { BoxArrowInUpRight } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Navbar bg="light" expand="lg" className="d-flex justify-content-between">
          <NavLink to="">
            <img src={MBlogo} alt="" width="50" height="50" className="mx-2"></img><img src={MBlogo2} alt="" width="150" height="50" className="mx-2"></img>
          </NavLink>
          <span className="mx-3" id="user-letter">T</span>
      </Navbar>
      <Container fluid="xs" id="blog-main">
        <Row id="content-row">
          <Col xs={4} md={3} xxl={2} className="link-column">
            <Row className="m-3">
              <NavLink to="/post-form"><button className="pill-button new-post-btn">+ NEW POST</button></NavLink>
            </Row>
            <Row className="m-3">
              <NavLink to="/"><button className="pill-button all-post-btn"><FileEarmarkFill className="icon"/> POSTS</button></NavLink>
            </Row>
            <Row className="m-3">
              <NavLink to="/blog"><button className="pill-button view-blog-btn"><BoxArrowInUpRight className="icon"/> VIEW BLOG</button></NavLink>
            </Row>
          </Col>
          <Col xs={8} md={9} xxl={10}>
          <Routes>
            <Route path="/" element={<PostList/>} />
            <Route path="/blog" element={<Blog/>} />
            <Route path="/post-form" element={<PostForm/>} />
            <Route path="/edit-post/:postID" element={<EditPost/>} />
            <Route path="/blog-post/:postID" element={<SingleBlogPost/>} />
            <Route path="/login" element={<Login />} />
          </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;

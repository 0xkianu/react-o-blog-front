import React from 'react';
import { BrowserRouter, NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import { PostList } from './app/components/PostList';
import { Blog } from './app/components/Blog';
import { PostForm } from './app/components/PostForm';
import { EditPost } from './app/components/EditPost';
import { SingleBlogPost } from './app/components/SingleBlogPost';
import { Login } from './app/components/Login';
import { CreateAccount } from './app/components/CreateAccount';
import { Protected } from './app/components/Protected';
import { selectIsLoggedIn, selectUserAccount, logOut } from './features/post/postsSlice';
import { useSelector, useDispatch } from 'react-redux';
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
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userAccount = useSelector(selectUserAccount);
  const dispatch = useDispatch();
  
  const accountLogOut = async () => {
    await fetch("/logout")
        .then(response => response.json())
        .then((json) => {
            if(json.isLoggedIn) {
                console.log("Still logged in");
            } else {
                dispatch(logOut());
            }
        });
  }

  return (
    <BrowserRouter>
      <Navbar bg="light" expand="lg" className="d-flex justify-content-between">
          <NavLink to="">
            <img src={MBlogo} alt="" width="50" height="50" className="mx-2"></img><img src={MBlogo2} alt="" width="150" height="50" className="mx-2"></img>
          </NavLink>
          <div className="d-flex align-items-center">
            <button className="pill-button" onClick={accountLogOut}> SIGN OUT</button>
            <span className="mx-3" id="user-letter">{userAccount[0]}</span>
          </div>
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
            <Route path="/" element={
              <Protected isLoggedIn={isLoggedIn}>
                <PostList/>
              </Protected>
            } />
            <Route path="/blog" element={
              <Protected isLoggedIn={isLoggedIn}>
                <Blog/>
              </Protected>
            } />
            <Route path="/post-form" element={
              <Protected isLoggedIn={isLoggedIn}>
                <PostForm/>
              </Protected>
            } />
            <Route path="/edit-post/:postID" element={
              <Protected isLoggedIn={isLoggedIn}>
                <EditPost/>
              </Protected>
            } />
            <Route path="/blog-post/:postID" element={
              <Protected isLoggedIn={isLoggedIn}>
                <SingleBlogPost/>
              </Protected>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />
          </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;

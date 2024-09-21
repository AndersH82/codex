import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PostPage from './pages/PostPage';
import PostDetailPage from './pages/PostDetailPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/posts/:id" component={PostDetailPage} />
        <Route path="/posts" component={PostPage} />
      </Switch>
    </Router>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import Auth from './pages/auth';
import Home from './pages/home';
import NotFound from './pages/not-found';
import Navbar from './components/navbar';
import PageContainer from './components/page-container';
import CreateProject from './pages/create-project';
import ProjectView from './pages/project-view';
import TechProjectView from './pages/tech-project-view';
import ManageUsers from './pages/manage-users';
import ProjectSearch from './pages/project-search';
import AddUser from './pages/add-user';

export default function App() {
  const [user, setUser] = useState();
  const [techs, setTechs] = useState([]);
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [route, setRoute] = useState(parseRoute(window.location.hash));

  function handleChange(event) {
    setRoute(parseRoute(window.location.hash));
  }

  useEffect(() => {
    window.addEventListener('hashchange', handleChange);
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jwtDecode(token) : null;
    setUser(user);
    setIsAuthorizing(false);
    return () => window.removeEventListener('hashchange', handleChange);

  }, []);

  useEffect(() => {
    fetch('/api/users/techs')
      .then((response) => response.json())
      .then((data) => setTechs(data))
      .catch((error) => { console.error('Error:', error); });
  }, []);

  function handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    setUser(user);
  }

  function handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    setUser(undefined);
  }

  function renderPage() {
    const { path } = route;
    if (path === '') {
      return <Home />;
    }
    if (path === 'sign-in' || path === 'sign-up') {
      return <Auth />;
    }
    if (path === 'projects') {
      return <ProjectView />;
    }
    if (path === 'techprojects') {
      return <TechProjectView />;
    }
    if (path === 'newproject') {
      return <CreateProject />;
    }
    if (path === 'projectsearch') {
      return <ProjectSearch />;
    }
    if (path === 'manageusers') {
      return <ManageUsers />;
    }
    if (path === 'adduser') {
      return <AddUser />;
    }
    return <NotFound />;
  }

  if (isAuthorizing) return null;

  const contextValue = { user, route, handleSignIn, handleSignOut, techs };
  return (
    <AppContext.Provider value={contextValue}>
      <Navbar />
      <PageContainer>
        {renderPage()}
      </PageContainer>
    </AppContext.Provider>
  );
}

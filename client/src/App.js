import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/layout/Home';
import Auth from './views/Auth';
import Dashboard from './views/Dashboard';
import About from './views/About';
import AuthContextProvider from './contexts/AuthContext';
import CourseContextProvider from './contexts/CourseContext';
import ProtectedRoute from './routing/ProtectedRoute';


function App() {
  return (
    <AuthContextProvider>
      <CourseContextProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' render={props => <Auth {...props} authRoute='login' />} />
            <Route exact path='/register' render={props => <Auth {...props} authRoute='register' />} />
            <ProtectedRoute exact path='/dashboard' component={Dashboard} />
            <ProtectedRoute exact path='/about' component={About} />
          </Switch>
        </Router>
      </CourseContextProvider>
    </AuthContextProvider>
    
  );
}

export default App;

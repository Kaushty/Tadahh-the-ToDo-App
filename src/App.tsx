import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components';
import { HomeScreen, LoginScreen, SignupScreen, NotFound } from './screens';
import './styles/rootStyles.css';

export function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <ProtectedRoute exact path="/" component={HomeScreen} />
          <Route exact path="/signup" component={SignupScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route path="*" component={NotFound} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

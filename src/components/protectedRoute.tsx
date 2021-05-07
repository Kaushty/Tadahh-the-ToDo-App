import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute: React.FC<RouteProps> = (props) => {
  const { currentUser } = useAuth();
  let redirectPath = '';
  if (!currentUser) {
    redirectPath = '/login';
  }

  if (redirectPath !== '') {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} />;
  } else {
    return <Route {...props} />;
  }
};

//   return (
//     <Route
//       {...rest}
//       exact={exact}
//       render={(props) => {
//         return currentUser ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/login" />
//         );
//       }}
//     ></Route>
//   );
// };

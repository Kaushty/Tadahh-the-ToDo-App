import React from 'react';

export const AppTitle: React.FunctionComponent = () => {
  return (
    <div className="centered app--title no--select">
      <h1 className="app--name"> TaDahh! </h1>
      <p className="app--tagline"> The ToDo App and more </p>
    </div>
  );
};

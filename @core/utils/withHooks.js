import React from 'react';


export const withHook = (hook, Component) => {
  return props => {
    return <Component {...hook(props)} />;
  };
};

export const navigationRef = React.createRef()

export function navigation() {
  return navigationRef.current
}
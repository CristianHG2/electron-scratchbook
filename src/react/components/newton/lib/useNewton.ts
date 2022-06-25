import useNewtonStore from './useNewtonStore';
import React, {FC} from 'react';

const useNewton = () => {
  const state = useNewtonStore();
  const newtonSvc = window.electronAPI.newton;

  return {
    component: state.component,

    navigate: (view: string): FC => {
      newtonSvc.navigate(view).then(props => {
        console.log(props);
        state.setComponent(view, props)
      });

      return () => React.createElement('div', {}, '');
    }
  }
};

export default useNewton;

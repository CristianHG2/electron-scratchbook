import React, {FC} from 'react';
import {FCParent} from '../../../types/common';
import useNewton from './lib/useNewton';

type NewtonResolver = (component: string) => FC<unknown>;

const NewtonProvider: FCParent<{resolver: NewtonResolver, home: string}> = ({resolver, home}) => {
  const {component: {name, props}, navigate} = useNewton();
  const Rendered = !name ? navigate(home) : resolver(name);

  return <Rendered {...props} />;
};

export default NewtonProvider;

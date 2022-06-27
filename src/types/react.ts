import React, {ReactNode} from 'react';

export type FCParent<T = {}> = React.FC<{
  children?: ReactNode;
} & T>

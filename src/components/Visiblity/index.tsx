import React, { PropsWithChildren } from 'react';

const Visibility = ({ show, children }: PropsWithChildren<{ show: boolean }>) =>
  show ? children : <div></div>;

export default Visibility;

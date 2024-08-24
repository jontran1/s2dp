import React, { FC } from 'react';
import styles from './HelloWorld.module.scss';

interface HelloWorldProps {}

const HelloWorld: FC<HelloWorldProps> = () => (
  <div className={styles.HelloWorld}>
    HelloWorld Component
  </div>
);

export default HelloWorld;

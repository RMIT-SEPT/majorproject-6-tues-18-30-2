import React from 'react';
import { Layout } from 'antd';
import * as styles from './Footer.style';

/**
 * Footer Properties
 */
export interface ComponentProps {};

/**
 * Footer Component
 */
export const Footer: React.FC<ComponentProps> = () => {
  const { Footer: Foundation } = Layout;
  
  return (
    <Foundation className={styles.ribbon}>
      RMIT SEPT Project: Group 6.TUES-18.30-2 © 2020
    </Foundation>
  );
};
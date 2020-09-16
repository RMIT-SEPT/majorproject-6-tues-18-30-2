import React from 'react';
import { Layout, Menu } from 'antd';
import { useLocation } from '@reach/router';
import { MenuItem } from '../';
import * as styles from './Header.style';

/**
 * Header Properties
 */
export interface ComponentProps {
  logoHidden?: boolean;
};

/**
 * Header Component
 */
export const Header: React.FC<ComponentProps> = ({ logoHidden, children}) => {
  const { Header: Foundation } = Layout;
  const location = useLocation();

  return (
    <Foundation style={{ padding: 0 }}>
      { logoHidden ? null : <div className={styles.logo} /> }
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']} selectedKeys={[location.pathname]} className={styles.mainNavbar}>
        { children }
        <MenuItem key="/" route="/">
          HOME
        </MenuItem>
        <MenuItem key="/dashboard" route="/dashboard">
          DASHBOARD
        </MenuItem>
      </Menu>
      <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]} className={styles.userNavbar}>
        <MenuItem key="/login" route="/login">
          LOGIN
        </MenuItem>
        <MenuItem key="/register" route="/register">
          REGISTER
        </MenuItem>
      </Menu>
    </Foundation>
  );
};
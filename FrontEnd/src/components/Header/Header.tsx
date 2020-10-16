import React, { useContext } from 'react';
import { Layout, Menu } from 'antd';
import { useLocation } from '@reach/router';
import { MenuItem, MenuModal, Login } from '../';
import * as styles from './Header.style';
import { UserContext } from '../../contexts';
import SubMenu from 'antd/lib/menu/SubMenu';

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
  const { user } = useContext(UserContext);
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
        {
          user === null
          ? null
          : (
            <>
              <MenuItem key="/dashboard" route="/dashboard">
                DASHBOARD
              </MenuItem>
              <MenuItem key="/booking-form" route="/booking-form">
                MAKE A BOOKING
              </MenuItem>
            </>
          )
        }
      </Menu>
      <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]} className={styles.userNavbar}>
        {
          user === null
            ? (
              <>
                <MenuModal modal={{ title: "Account Login", component: <Login /> }}>
                  LOGIN
                </MenuModal>
                <MenuItem key="/register" route="/register">
                  REGISTER
                </MenuItem>
              </>
            )
            : (
              <SubMenu key="account" title={`${user.firstName} ${user.lastName}`}>
                <MenuItem key="/profile" route="/profile">
                  MY PROFILE
                </MenuItem>
              </SubMenu>
            )
        }
      </Menu>
    </Foundation>
  );
};
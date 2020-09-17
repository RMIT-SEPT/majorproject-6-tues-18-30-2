import React from 'react';
import { Menu } from 'antd';
import { Link } from '@reach/router';

/**
 * MenuItem Properties
 */
export interface ComponentProps {
  route: string;
};

/**
 * MenuItem Component
 */
export const MenuItem: React.FC<ComponentProps> = ({ children, route, ...props }) => {
  return (
    <Menu.Item {...props}>
      <Link to={route}>
        { children }
      </Link>
    </Menu.Item>
  );
};
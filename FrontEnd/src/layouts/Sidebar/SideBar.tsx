import React, { useState } from 'react';
import { Layout, Breadcrumb, Menu } from 'antd';
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import { Header, Footer } from '../../components';
import * as styles from './SideBar.style';

/**
 * SideBar Properties
 */
export interface LayoutProps {
  hamburgerMenu?: boolean;
};

/**
 * SideBar Layout
 */
export const SideBar: React.FC<LayoutProps> = ({ hamburgerMenu, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { Sider, Content } = Layout;
  const siderCollapseIcon = collapsed ? <RightOutlined /> : <LeftOutlined />;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={hamburgerMenu ? null : siderCollapseIcon} collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className={styles.logo} />
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
            ITEM 1
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            ITEM 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            ITEM 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header logoHidden>
          { !hamburgerMenu ? null : collapsed
            ? <MenuUnfoldOutlined className={styles.trigger} onClick={() => setCollapsed(!collapsed)} />
            : <MenuFoldOutlined className={styles.trigger} onClick={() => setCollapsed(!collapsed)} />
          }
        </Header>
        <Content style={{ padding: '0 50px', minHeight: 280, }}>
          <Breadcrumb style={{ margin: '16px 0'}}>
            <Breadcrumb.Item>TODO</Breadcrumb.Item>
          </Breadcrumb>
          <div className={styles.contents}>
            { children }
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
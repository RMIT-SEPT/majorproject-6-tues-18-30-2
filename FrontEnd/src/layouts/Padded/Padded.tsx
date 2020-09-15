import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import * as styles from './Padded.style';

/**
 * Padded Layout
 */
export const Padded: React.FC = ({ children }) => {
  const { Content } = Layout;

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0'}}>
          <Breadcrumb.Item>TODO</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.contents}>
          { children }
        </div>
      </Content>
    </Layout>
  );
};
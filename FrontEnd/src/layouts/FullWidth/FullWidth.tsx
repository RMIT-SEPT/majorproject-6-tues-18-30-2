import React from 'react';
import { Layout } from 'antd';
import { Header, Footer } from '../../components';
import * as styles from './FullWidth.style';

/**
 * FullWidth Layout
 */
export const FullWidth: React.FC = ({ children }) => {
  const { Content } = Layout;

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header />
      <Content>
        <div className={styles.contents}>
          { children }
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};
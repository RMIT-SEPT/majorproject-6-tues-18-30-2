import React from 'react';
import { Button, Layout, Typography } from 'antd';
import { navigate } from '@reach/router';

/**
 * NotFound Page
 */
export const NotFound: React.FC = () => {
  const { Content } = Layout;
  const { Paragraph } = Typography;

  return (
    <Layout style={{ minHeight: '100vh', padding: '100px' }}>
      <Content>
        <h1>
          404 - Page does not exist.
        </h1>
        <Paragraph>
          Did you want to
          <Button type="link" onClick={() => navigate(-1)} style={{ margin: 0, padding: '0px 5px' }}>
            go back
          </Button>
          where you came from?
        </Paragraph>
      </Content>
    </Layout>
  );
};
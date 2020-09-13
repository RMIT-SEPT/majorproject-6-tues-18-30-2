import React from 'react';
import { RouteComponentProps } from '@reach/router';

/**
 * Route Properties
 */
export interface ComponentProps extends RouteComponentProps {
  page: JSX.Element
};

/**
 * Route Component
 */
export const Route: React.FC<ComponentProps> = ({
  page
}) => page;
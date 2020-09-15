import { style } from 'typestyle';

export const logo = style({
  height: '31px',
  margin: '16px 24px',
  background: 'rgba(255, 255, 255, 0.2)'
});

export const trigger = style({
  fontSize: '18px',
  lineHeight: '64px',
  padding: '0 24px',
  cursor: 'pointer',
  transition: 'color 0.3s',
  $nest: {
    '&:hover': {
      color: '#1890ff'
    }
  }
});

export const contents = style({
  minHeight: '280px',
  padding: '24px',
  background: '#ffffff'
});
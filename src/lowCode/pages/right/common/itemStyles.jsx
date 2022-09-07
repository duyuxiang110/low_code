import React from 'react';
import { Input } from 'antd';
import {
  BorderTopOutlined,
  BorderRightOutlined,
  BorderBottomOutlined,
  BorderLeftOutlined,
} from '@ant-design/icons';
import { labelConfig } from '../labelConfig';

const style_ = {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 5px',
    borderBottom: '1px solid #e2e0e0',
  },
};
const style_2 = {
  style: {
    width: 100,
  },
};
const marginStyle = {
  style: {
    padding: '15px 5px',
    borderBottom: '1px solid #e2e0e0',
  },
};
const marginStyleWidth = {
  style: {
    width: 130,
  },
};
let margin_value = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
};
export default ({ styles, label, value, render }) => {
  const handleStyles = (e, index) => {
    if (e) {
      if (typeof value === 'string') {
        styles[label] = e + 'px';
      }
      if (typeof value === 'undefined') {
        margin_value[index] = e + 'px';
        const marginValue = Object.values(margin_value).join(' ');
        styles[label] = marginValue;
      }
      render();
    }
  };

  switch (typeof value) {
    case 'string':
      return (
        <div {...style_}>
          <div style={{ marginBottom: 5 }}>{labelConfig[label]}</div>
          <Input addonAfter="px" onChange={(e) => handleStyles(e.target.value)} {...style_2} />
        </div>
      );
    case 'undefined':
      return (
        <div {...marginStyle}>
          <div style={{ marginBottom: 5 }}>{labelConfig[label]}</div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 5 }}>
            <Input
              addonBefore={<BorderTopOutlined />}
              addonAfter="px"
              onChange={(e) => handleStyles(e.target.value, 0)}
              {...marginStyleWidth}
            />
            <Input
              addonBefore={<BorderRightOutlined />}
              addonAfter="px"
              onChange={(e) => handleStyles(e.target.value, 1)}
              {...marginStyleWidth}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Input
              addonBefore={<BorderBottomOutlined />}
              addonAfter="px"
              onChange={(e) => handleStyles(e.target.value, 2)}
              {...marginStyleWidth}
            />

            <Input
              addonBefore={<BorderLeftOutlined />}
              addonAfter="px"
              onChange={(e) => handleStyles(e.target.value, 3)}
              {...marginStyleWidth}
            />
          </div>
        </div>
      );
    default:
      return <div></div>;
  }
};

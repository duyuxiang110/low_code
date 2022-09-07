import React from 'react';
import { Form } from 'antd';
export default ({
  configs: { fieldProperties, componentProperties, extra, styles },
  StandardInput,
}) => {
  const childNode = (nodes) => {
    if (!nodes) return;
    const new_node = typeof nodes;
    if (new_node === 'function') {
      const Node = nodes;
      return <Node />;
    } else {
      return nodes;
    }
  };

  return (
    <Form.Item {...fieldProperties}>
      <StandardInput {...componentProperties} style={{ ...styles }}>
        {childNode(extra?.childrenNode)}
      </StandardInput>
    </Form.Item>
  );
};

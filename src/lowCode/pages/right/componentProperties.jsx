import React from 'react';
import { Switch, Input, InputNumber, Select } from 'antd';
import InputOptions from './common/inputOptions';
import { labelConfig } from './labelConfig';

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

const componentPropertiesType = {
  options: {
    type: 'options',
  },
};
export default ({ label, value, componentProperties, render }) => {
  const { options } = componentProperties;
  const handleChange = (e) => {
    componentProperties[label] = e;
    render();
  };

  const type_options = componentPropertiesType[label]?.type;

  switch (typeof value) {
    case 'boolean':
      return (
        <div {...style_}>
          <div>{labelConfig[label]}</div>
          <Switch onChange={handleChange} checked={componentProperties[label]} />
        </div>
      );
    case 'string':
      return (
        <div {...style_}>
          <div>{labelConfig[label]}</div>
          <Input
            onChange={(e) => handleChange(e.target.value)}
            {...style_2}
            value={componentProperties[label]}
          />
        </div>
      );
    case 'number':
      return (
        <div {...style_}>
          <div>{labelConfig[label]}</div>
          <InputNumber onChange={handleChange} {...style_2} value={componentProperties[label]} />
        </div>
      );
    case 'object':
      return (
        <div>
          <div>{labelConfig[label]}</div>
          <div>
            {type_options ? (
              <InputOptions componentProperties={componentProperties} render={render} />
            ) : (
              <Select
                onChange={handleChange}
                {...style_2}
                options={options}
                value={componentProperties[label]}
              />
            )}
          </div>
        </div>
      );
    default:
      return <div></div>;
  }
};

import React from "react";
import { Switch, Input, InputNumber, Select } from "antd";
import InputOptions from "./common/inputOptions";
import { labelConfig } from "./labelConfig";
import {
  componentPropertiesType,
  style_,
  style_2,
} from "./common/componentPropertiesType";

export default ({ label, value, componentProperties, render }) => {
  const handleChange = (e) => {
    componentProperties[label] = e;
    render();
  };
  const type_options = componentPropertiesType[label]?.type;
  const type_value = componentPropertiesType[label]?.value;
  console.log(type_value, label);

  switch (typeof value) {
    case "boolean":
      return (
        <div {...style_}>
          <div>{labelConfig[label]}</div>
          <Switch
            onChange={handleChange}
            checked={componentProperties[label]}
          />
        </div>
      );
    case "string":
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
    case "number":
      return (
        <div {...style_}>
          <div>{labelConfig[label]}</div>
          <InputNumber
            onChange={handleChange}
            {...style_2}
            value={componentProperties[label]}
          />
        </div>
      );
    case "object":
      return (
        <div {...style_}>
          <div>{labelConfig[label]}</div>
          <div>
            {type_options === "options" ? (
              <InputOptions
                componentProperties={componentProperties}
                render={render}
              />
            ) : (
              <Select
                onChange={handleChange}
                {...style_2}
                options={type_value}
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

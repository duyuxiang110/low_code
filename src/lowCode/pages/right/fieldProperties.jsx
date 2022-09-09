import React, { useState, useRef, Fragment, useMemo } from "react";
import { Switch, Input, Select, Button } from "antd";
import { labelConfig } from "./labelConfig";
import Rules from "./common/rules";
import {
  componentPropertiesType,
  style_,
  style_2,
  layout,
  optionsLayout,
} from "./common/componentPropertiesType";

export default ({
  label,
  value,
  fieldProperties,
  id,
  activeSchema,
  render,
  FormConfig,
}) => {
  const typeofPropDefaultValue = useRef(typeof value);

  const [defaultValue, setDefaultValue] = useState(value);
  const [visible, setVisible] = useState(false);

  const type_layout = componentPropertiesType[label]?.type;

  const handleChange = (e) => {
    if (activeSchema.current.id === id) {
      fieldProperties[label] = e;
      setDefaultValue(e);
      render();
    }
  };

  const handleStyles = (e, index, type) => {
    if (e) {
      const rowMargin = index === "span" || index === "offset";
      rowMargin ? (layout[index] = e) : (optionsLayout[index] = e);
      FormConfig.current.configs.fieldProperties = {
        ...FormConfig.current.configs.fieldProperties,
        [type]: rowMargin ? layout : optionsLayout[type],
      };
      render();
    }
  };
  console.log(label, value);
  switch (typeofPropDefaultValue.current) {
    case "boolean":
      return (
        <div {...style_}>
          <div>{labelConfig[label]}</div>
          <Switch onChange={handleChange} checked={defaultValue} />
        </div>
      );
    case "string":
      return (
        <div {...style_}>
          {type_layout === "options" && (
            <Fragment>
              <div>{labelConfig[label]}</div>
              <Select
                options={componentPropertiesType[label]?.value}
                onChange={(e) => handleStyles(e, label, label)}
                defaultValue={value}
                {...style_2}
              />
            </Fragment>
          )}
          {type_layout !== "options" &&
            type_layout !== "wrapperCol" &&
            type_layout !== "labelCol" && (
              <Fragment>
                <div>{labelConfig[label]}</div>
                <Input
                  value={defaultValue}
                  onChange={(e) => handleChange(e.target.value)}
                  {...style_2}
                />
              </Fragment>
            )}
        </div>
      );
    case "object":
      return (
        <div {...style_}>
          <div>{labelConfig[label]}</div>
          {label !== "labelCol" && label !== "wrapperCol" && (
            <div
              onClick={() => {
                setVisible(true);
              }}
            >
              <Button>校验规则</Button>
            </div>
          )}
          {type_layout === "labelCol" && (
            <Fragment>
              <Input
                addonAfter="span"
                onChange={(e) =>
                  handleStyles(e.target.value, "span", "labelCol")
                }
                defaultValue={value.span}
                {...style_2}
              />
              <Input
                addonAfter="offset"
                onChange={(e) =>
                  handleStyles(e.target.value, "offset", "labelCol")
                }
                defaultValue={value.offset}
                {...style_2}
              />
            </Fragment>
          )}
          {type_layout === "wrapperCol" && (
            <Fragment>
              <Input
                addonAfter="span"
                onChange={(e) =>
                  handleStyles(e.target.value, "span", "wrapperCol")
                }
                defaultValue={value.span}
                {...style_2}
              />
              <Input
                addonAfter="offset"
                onChange={(e) =>
                  handleStyles(e.target.value, "offset", "wrapperCol")
                }
                defaultValue={value.offset}
                {...style_2}
              />
            </Fragment>
          )}

          {visible ? (
            <Rules
              visible={visible}
              setVisible={setVisible}
              // rulesRef={rulesRef}
              render={render}
              fieldProperties={fieldProperties}
            />
          ) : null}
        </div>
      );
    default:
      return <div></div>;
  }
};

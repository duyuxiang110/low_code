import React, { useState, useRef, Fragment, useMemo } from "react";
import { Switch, Input, Select, Button } from "antd";
import { labelConfig } from "./labelConfig";
import Rules from "./common/rules";

const style_ = {
  style: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 5px",
    borderBottom: "1px solid #e2e0e0",
  },
};
const style_2 = {
  style: {
    width: 100,
  },
};
const componentPropertiesType = {
  labelCol: {
    type: "labelCol",
  },
  wrapperCol: {
    type: "wrapperCol",
  },
  size: {
    type: "options",
    value: [
      { value: "small", label: "small" },
      { value: "middle", label: "middle" },
      { value: "large", label: "large" },
    ],
  },
  layout: {
    type: "options",
    value: [
      { value: "horizontal", label: "horizontal" },
      { value: "vertical", label: "vertical" },
      { value: "inline", label: "inline" },
    ],
  },
  labelAlign: {
    type: "options",
    value: [
      { value: "left", label: "left" },
      { value: "right", label: "right" },
    ],
  },
};
const layout = {
  span: 0,
  offset: 0,
};
const optionsLayout = {
  size: undefined,
  layout: undefined,
  labelAlign: undefined,
};
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

  const [saveRules, setSaveRules] = useState([
    { require: true, message: "" },
    // { len: 0, message: '长度' },
    { max: 0, message: "最大长度" },
    { min: 0, message: "最小长度" },
  ]);
  const [defaultValue, setDefaultValue] = useState(value);
  const [visible, setVisible] = useState(false);

  const type_layout = componentPropertiesType[label]?.type;

  useMemo(() => {
    if (saveRules) {
      fieldProperties.rules = saveRules;
    }
  }, [saveRules]);

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
                {...style_2}
              />
              <Input
                addonAfter="offset"
                onChange={(e) =>
                  handleStyles(e.target.value, "offset", "labelCol")
                }
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
                {...style_2}
              />
              <Input
                addonAfter="offset"
                onChange={(e) =>
                  handleStyles(e.target.value, "offset", "wrapperCol")
                }
                {...style_2}
              />
            </Fragment>
          )}

          {visible ? (
            <Rules
              visible={visible}
              setVisible={setVisible}
              saveRules={saveRules}
              render={render}
              setSaveRules={setSaveRules}
              rulesList={fieldProperties.rules}
            />
          ) : null}
        </div>
      );
    default:
      return <div></div>;
  }
};

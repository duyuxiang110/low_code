import React, { useMemo, useRef } from "react";
import { Drawer, Select, Input, Switch, InputNumber } from "antd";
import { emptyArray } from "../../utils";
import { style_, style_2 } from "./componentPropertiesType";

export default ({ visible, setVisible, render, fieldProperties }) => {
  const rulesRef = useRef([
    { require: false, message: "" },
    { max: null, message: "" },
    { min: null, message: "" },
  ]);
  const rules = useMemo(() => {
    return [
      {
        label: "手机号格式",
        value: 0,
      },
      {
        label: "邮箱格式",
        value: 1,
      },
    ];
  }, []);
  const onClose = () => {
    setVisible(false);
  };

  const handleInput = (e, type, index) => {
    rulesRef.current.forEach((item, index_) => {
      if (index_ === index) {
        item[type] = e;
      }
      Object.keys(item).forEach((j) => {
        if (item[j] === undefined || item[j] === null || item[j] === "") {
          delete item[j];
        }
        return item;
      });
    });
    render();
  };
  const onChange = (e) => {
    if (e.label === "手机号格式") {
      rulesRef.current = [
        ...rulesRef.current,
        {
          pattern:
            /^[1][3-9]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/,
          message: "请输入正确号码",
        },
      ];
    } else if (e.label === "邮箱格式") {
      rulesRef.current = [
        ...rulesRef.current,
        {
          pattern: /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
          message: "请输入正确邮箱",
        },
      ];
    }
    render();
  };

  fieldProperties.rules = emptyArray(rulesRef.current);
  return (
    <div>
      <Drawer
        title="校验规则"
        placement="right"
        onClose={onClose}
        visible={visible}
        getContainer={false}
        style={{
          position: "absolute",
        }}
      >
        <div>
          <div {...style_}>
            require:
            <Switch onChange={(e) => handleInput(e, "require", 0)} />
            <Input
              addonAfter="提示"
              onChange={(e) => handleInput(e.target.value, "message", 0)}
            />
          </div>
          <div {...style_}>
            <InputNumber
              addonBefore="max"
              onChange={(e) => handleInput(e, "max", 1)}
            />
            <Input
              addonAfter="提示"
              onChange={(e) => handleInput(e.target.value, "message", 1)}
            />
          </div>
          <div {...style_}>
            <InputNumber
              addonBefore="min"
              onChange={(e) => handleInput(e, "min", 2)}
            />
            <Input
              addonAfter="提示"
              onChange={(e) => handleInput(e.target.value, "message", 2)}
            />
          </div>
        </div>
        <div {...style_}>
          校验格式：
          <Select
            labelInValue
            options={rules}
            {...style_2}
            onChange={onChange}
          />
        </div>
      </Drawer>
    </div>
  );
};

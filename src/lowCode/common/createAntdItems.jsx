import React from "react";
import { antdItemConfig } from "./antdItem";
import FormItem from "./formItem";
import { icon } from "../pages/left/svgConfig";
import "../index.less";

export const creactAntdItems = (status) => {
  const result = [];
  const new_antdItemConfig = antdItemConfig["antd"];
  const onDragStart = (e) => {
    const dragMiddle = document.querySelector("#dragMiddle");
    dragMiddle.style.outline = "1px dashed #1890ff";
    const schemaType = e.target.dataset.type;
    e.dataTransfer.setData("text/plain", schemaType);
  };
  for (let value of Object.values(new_antdItemConfig)) {
    const { type, StandardInput, configs } = value;
    const item = (
      <div
        key={type}
        draggable
        onDragStart={onDragStart}
        data-type={type}
        className="item-content"
      >
        <div className="item-forbidden">
          {status ? (
            <div className="left-code">
              <div>{icon[type].value}</div>
              <div>{icon[type].label}</div>
            </div>
          ) : (
            <FormItem configs={configs} StandardInput={StandardInput} />
          )}
        </div>
      </div>
    );
    result.push(item);
  }
  return result;
};

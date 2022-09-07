import React, { useContext } from "react";
import { antdItemConfig } from "../../common/antdItem";
import FormItem from "../../common/formItem";
import { ConfigContent } from "../../index";
import { DeleteOutlined } from "@ant-design/icons";
import "../../index.less";

export default ({ index, dragIndex, type, configs, item, isGlobal }) => {
  const { schemaList, setSchemaList, render, activeSchema } =
    useContext(ConfigContent);
  const StandardInput = antdItemConfig.antd[type].StandardInput;
  const dragMiddle = document.querySelector("#dragMiddle");

  const activeIndex = activeSchema.current === item;

  const onDragEnter = () => {
    dragMiddle.style.outline = "1px dashed #1890ff";
    dragIndex.current = index;
  };

  const onDragEnd = () => {
    setSchemaList((pre) => {
      const temp = pre[dragIndex.current];
      schemaList[dragIndex.current] = schemaList[index];
      schemaList[index] = temp;
      return schemaList;
    });
    dragMiddle.style.outline = 0;
    render();
  };
  const clear = () => {
    const list = schemaList.filter((item, sindex) => {
      if (sindex !== index) {
        return item;
      }
    });
    setSchemaList(list);
    render();
  };

  const activeSchemaClick = () => {
    const active = schemaList.filter((item, sindex) => {
      if (sindex === index) {
        return item;
      }
    });
    if (!isGlobal.current) {
      activeSchema.current = active[0];
    }
    render();
  };

  const onMouseEnter = () => {
    dragMiddle.style.outline = "0";
    isGlobal.current = false;
  };
  const onMouseLeave = () => {
    console.log(dragMiddle);
    dragMiddle.style.outline = "1px dashed #1890ff";
    isGlobal.current = true;
  };
  return (
    <div
      draggable
      className={`middle-form-item ${activeIndex ? "middle-border" : ""}`}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onClick={activeSchemaClick}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      <FormItem configs={configs} StandardInput={StandardInput} />
      {activeIndex && (
        <div onClick={clear} className="middle-form-item-clear">
          <DeleteOutlined style={{ color: "white", fontSize: 16 }} />
        </div>
      )}
    </div>
  );
};

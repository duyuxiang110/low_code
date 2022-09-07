import React, { useRef, useContext, useState } from "react";
import { Form, Modal } from "antd";
import { ConfigContent } from "../../index";
import { antdItemConfig } from "../../common/antdItem";
import DroppedItem from "./droppedItem";
import { v4 as uuidv4 } from "uuid";
import { cloneDeep } from "lodash";
import "../../index.less";

// import JSONSchema from './JSONSchema';

export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dragIndex = useRef(null);
  const isGlobal = useRef(null);
  const [form] = Form.useForm();

  const { schemaList, setSchemaList, activeSchema, render, FormConfig } =
    useContext(ConfigContent);

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const onDrop = (e) => {
    e.preventDefault();
    const schemaType = e.dataTransfer.getData("text/plain");
    if (!schemaType) return;
    const total = antdItemConfig.antd[schemaType];
    const new_total = Object.assign({}, total, { id: uuidv4() });
    const cloneSchema = cloneDeep(new_total);
    if (cloneSchema) {
      setSchemaList([...schemaList, cloneSchema]);
    }
    const dragMiddle = document.querySelector("#dragMiddle");
    dragMiddle.style.outline = 0;
  };

  const global = () => {
    if (isGlobal.current) {
      activeSchema.current = FormConfig.current;
      render();
    }
  };

  return (
    <div className="lowCode-middle">
      <div style={{ background: "#eee", height: "100%" }}>
        <div
          className="lowCode-middle-title"
          onClick={() => setIsModalVisible(true)}
        >
          查看
        </div>
        <Form form={form} {...FormConfig.current.configs.fieldProperties}>
          <div
            id="dragMiddle"
            onDragOver={onDragOver}
            onDrop={onDrop}
            onClick={global}
          >
            {schemaList.map((item, index) => {
              return (
                <DroppedItem
                  key={item.id}
                  {...item}
                  index={index}
                  dragIndex={dragIndex}
                  item={item}
                  isGlobal={isGlobal}
                />
              );
            })}
          </div>
        </Form>
      </div>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        footer={false}
        onCancel={() => setIsModalVisible(false)}
        width="50vw"
        bodyStyle={{ height: "60vh", overflow: "auto" }}
      >
        {/* <JSONSchema /> */}
        <pre>{JSON.stringify(...schemaList)}</pre>
      </Modal>
    </div>
  );
};

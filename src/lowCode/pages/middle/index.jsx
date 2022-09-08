import React, { useRef, useContext, useState, useEffect } from "react";
import { Form, Modal } from "antd";
import { ConfigContent } from "../../index";
import { antdItemConfig } from "../../common/antdItem";
import DroppedItem from "./droppedItem";
import { v4 as uuidv4 } from "uuid";
import { cloneDeep } from "lodash";
import { LeftSquareFilled, RightSquareFilled } from "@ant-design/icons";
import "../../index.less";

// import JSONSchema from './JSONSchema';
const style = {
  style: {
    fontSize: "24px",
  },
};
export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dragIndex = useRef(null);
  const isGlobal = useRef(null);
  const copy = useRef({
    pre: [],
  });
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
  const leftSquare = () => {
    if (schemaList.length === 0) {
      return;
    }
    setSchemaList((pre) => {
      const last = pre.pop();
      copy.current.pre.unshift(last);
      return pre;
    });
    render();
  };
  const rightSquare = () => {
    if (copy.current.pre.length === 0) {
      return;
    }
    const pre = copy.current.pre.shift();
    setSchemaList([...schemaList, pre]);
    render();
  };

  return (
    <div className="lowCode-middle">
      <div style={{ background: "#eee", height: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ marginLeft: "10px" }}>
            <span
              onClick={leftSquare}
              style={schemaList.length === 0 ? { color: "#bfbfbf" } : null}
            >
              <LeftSquareFilled {...style} />
            </span>
            <span
              onClick={rightSquare}
              style={
                copy.current.pre.length === 0 ? { color: "#bfbfbf" } : null
              }
            >
              <RightSquareFilled {...style} />
            </span>
          </div>

          <div
            className="lowCode-middle-title"
            onClick={() => setIsModalVisible(true)}
          >
            <svg
              viewBox="0 0 1024 1024"
              height="1em"
              width="1em"
              fill="currentColor"
              focusable="false"
              aria-hidden="true"
            >
              <path d="M206.497462,203.065268 C225.380711,197.940758 240,211.850142 240,233.080254 C240,250.650002 230.253807,260.166948 222.944162,263.09524 C163.857868,285.057424 155.329949,307.751682 155.329949,357.532634 C155.329949,372.174091 156.548223,396.332494 156.548223,411.706023 C156.548223,468.807703 133.401015,496.626471 93.1979695,512 C134.010152,528.105602 156.548223,555.192297 156.548223,612.293977 C156.548223,619.107246 156.308942,627.645952 156.04247,636.317008 L155.98059,638.319645 L155.897583,640.989618 C155.607459,650.323572 155.329949,659.479398 155.329949,666.467366 C155.329949,716.248318 163.857868,738.942576 222.944162,760.90476 C230.253807,763.833052 240,773.349998 240,790.919746 C240,812.149858 225.380711,826.059242 206.497462,820.934732 C112.081218,796.044256 87.106599,750.655741 87.106599,678.912604 C87.106599,673.593637 87.3924294,663.980713 87.687192,654.067212 L87.687192,654.067212 L87.801145,650.223294 C88.0747343,640.939007 88.3248731,631.842609 88.3248731,626.203361 C88.3248731,572.762044 72.4873096,548.603641 31.0659898,547.139496 C11.5736041,545.67535 0,531.765966 0,512 C0,492.234034 11.5736041,478.32465 31.0659898,476.860504 C72.4873096,474.664286 88.3248731,451.237956 88.3248731,397.064567 C88.3248731,391.425318 88.0747343,382.32892 87.801145,373.044633 L87.801145,373.044633 L87.687192,369.200715 C87.3924294,359.287214 87.106599,349.67429 87.106599,344.355323 C87.106599,273.344259 112.081218,227.955744 206.497462,203.065268 Z M817.502538,203.065268 C911.918782,227.955744 936.893401,273.344259 936.893401,344.355323 C936.893401,349.67429 936.607571,359.287214 936.312808,369.200715 L936.198855,373.044633 C935.925266,382.32892 935.675127,391.425318 935.675127,397.064567 C935.675127,451.237956 951.51269,474.664286 992.93401,476.860504 C1012.4264,478.32465 1024,492.234034 1024,512 C1024,531.765966 1012.4264,545.67535 992.93401,547.139496 C951.51269,548.603641 935.675127,572.762044 935.675127,626.203361 C935.675127,631.842609 935.925266,640.939007 936.198855,650.223294 L936.312808,654.067212 C936.607571,663.980713 936.893401,673.593637 936.893401,678.912604 C936.893401,750.655741 911.918782,796.044256 817.502538,820.934732 C798.619289,826.059242 784,812.149858 784,790.919746 C784,773.349998 793.746193,763.833052 801.055838,760.90476 C860.142132,738.942576 868.670051,716.248318 868.670051,666.467366 C868.670051,659.479398 868.392541,650.323572 868.102417,640.989618 L868.01941,638.319645 L867.95753,636.317008 C867.691058,627.645952 867.451777,619.107246 867.451777,612.293977 C867.451777,555.192297 889.989848,528.105602 930.80203,512 C890.598985,496.626471 867.451777,468.807703 867.451777,411.706023 C867.451777,396.332494 868.670051,372.174091 868.670051,357.532634 C868.670051,307.751682 860.142132,285.057424 801.055838,263.09524 C793.746193,260.166948 784,250.650002 784,233.080254 C784,211.850142 798.619289,197.940758 817.502538,203.065268 Z M312,549 C342.375661,549 367,573.624339 367,604 C367,634.375661 342.375661,659 312,659 C281.624339,659 257,634.375661 257,604 C257,573.624339 281.624339,549 312,549 Z M512,549 C542.375661,549 567,573.624339 567,604 C567,634.375661 542.375661,659 512,659 C481.624339,659 457,634.375661 457,604 C457,573.624339 481.624339,549 512,549 Z M712,549 C742.375661,549 767,573.624339 767,604 C767,634.375661 742.375661,659 712,659 C681.624339,659 657,634.375661 657,604 C657,573.624339 681.624339,549 712,549 Z"></path>
            </svg>
          </div>
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
        title="Schema"
        visible={isModalVisible}
        footer={false}
        onCancel={() => setIsModalVisible(false)}
        width="50vw"
        bodyStyle={{ height: "60vh", overflow: "auto" }}
        destroyOnClose
      >
        {/* <JSONSchema /> */}
        <pre>{JSON.stringify(...schemaList)}</pre>
      </Modal>
    </div>
  );
};

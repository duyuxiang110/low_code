import React, { createContext, useState, useRef } from "react";
import { Tabs } from "antd";
import Left from "./pages/left";
import Middle from "./pages/middle";
import Right from "./pages/right";
import "./index.less";

const { TabPane } = Tabs;
export const ConfigContent = createContext(null);
const defaultFormConfigProps = {
  configs: {
    fieldProperties: {
      labelCol: { span: 6, offset: 0 },
      wrapperCol: { span: 16, offset: 0 },
      colon: true,
      labelAlign: "right",
      layout: "horizontal",
      scrollToFirstError: false,
      size: "small",
      preserve: true,
    },
  },
};
export default () => {
  const [schemaList, setSchemaList] = useState([]);
  const [, setForce] = useState(0);
  const activeSchema = useRef({});
  const FormConfig = useRef(defaultFormConfigProps);
  const contentConfigValue = {
    schemaList,
    setSchemaList,
    activeSchema,
    FormConfig,
    render: () => setForce((pre) => pre + 1),
  };
  console.log(activeSchema.current, "所有配置");
  return (
    <div className="lowCode">
      <ConfigContent.Provider value={contentConfigValue}>
        <Tabs tabPosition={"left"}>
          <TabPane tab="1" key="1">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Left />
              <Middle />
              <Right />
            </div>
          </TabPane>
          <TabPane tab="2" key="2">
            查看收藏JSON Schema
          </TabPane>
        </Tabs>
      </ConfigContent.Provider>
    </div>
  );
};

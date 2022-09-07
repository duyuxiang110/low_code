import React, { useContext, useMemo } from "react";
import { ConfigContent } from "../../index";
import ComponentProperties from "./componentProperties";
import FieldProperties from "./fieldProperties";
import ItemStyle from "./common/itemStyles";
import "../../index.less";

export default () => {
  const { activeSchema, FormConfig, render } = useContext(ConfigContent);
  const { configs, id } =
    Object.keys(activeSchema.current).length > 0 && activeSchema.current;
  const { componentProperties, fieldProperties, styles } = configs || {};
  const propsItem = useMemo(
    () => Object.entries(fieldProperties || {}),
    [activeSchema.current]
  );
  const propsInput = useMemo(
    () => Object.entries(componentProperties || {}),
    [activeSchema.current]
  );
  const propsStyles = useMemo(
    () => Object.entries(styles || {}),
    [activeSchema.current]
  );

  return (
    <div className="lowCode-right">
      {Object.keys(activeSchema.current).length === 0 ? null : (
        <>
          <div>
            <div style={{ background: "#f0f0f0" }}>字段属性</div>
            {propsItem.map(([label, value]) => {
              return (
                <div key={label + id}>
                  <FieldProperties
                    label={label}
                    value={value}
                    fieldProperties={fieldProperties}
                    render={render}
                    id={id}
                    activeSchema={activeSchema}
                    FormConfig={FormConfig}
                  />
                </div>
              );
            })}
          </div>
          <div>
            <div style={{ background: "#f0f0f0" }}>组件属性</div>
            {propsInput.map(([label, value]) => {
              return (
                <div key={label + id}>
                  <ComponentProperties
                    label={label}
                    value={value}
                    componentProperties={componentProperties}
                    render={render}
                  />
                </div>
              );
            })}
          </div>
          <div>
            <div style={{ background: "#f0f0f0" }}>组件样式</div>
            {propsStyles.map(([label, value]) => {
              return (
                <div key={label + id}>
                  <ItemStyle
                    styles={styles}
                    label={label}
                    value={value}
                    render={render}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

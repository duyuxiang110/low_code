import React, { useMemo } from "react";
import { creactAntdItems } from "../../common/createAntdItems";
import "../../index.less";

export default () => {
  const Items = useMemo(() => creactAntdItems("left"), []);
  return (
    <div className="lowCode-left">
      <div style={{ marginTop: "-1px" }}>{Items}</div>
    </div>
  );
};

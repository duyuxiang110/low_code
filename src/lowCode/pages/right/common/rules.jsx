import React, { useMemo } from 'react';
import { Drawer, Select, Input, Switch, InputNumber } from 'antd';

const style_ = {
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 5px',
    borderBottom: '1px solid #e2e0e0',
  },
};
const style_2 = {
  style: {
    width: 100,
  },
};

export default ({ visible, setVisible, saveRules, render, rulesList, setSaveRules }) => {
  const rules = useMemo(() => {
    return [
      {
        label: '手机号格式',
        value: 0,
      },
      {
        label: '邮箱格式',
        value: 1,
      },
    ];
  }, []);
  const onClose = () => {
    setVisible(false);
    render();
  };

  const handleInput = (e, type, index) => {
    setSaveRules((pre) => {
      pre.forEach((item) => {
        Object.keys(item).forEach(() => {
          pre[index] = { ...pre[index], [type]: e };
        });
      });
      return pre;
    });
    // saveRules.forEach((item) => {
    //   Object.keys(item).forEach(() => {
    //     saveRules[index] = { ...saveRules[index], [type]: e };
    //   });
    // });
  };
  const onChange = (e) => {
    if (e.label === '手机号格式') {
      setSaveRules([
        ...saveRules,
        {
          pattern: /^[1][3-9]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/,
          message: '请输入正确号码',
        },
      ]);
    } else if (e.label === '邮箱格式') {
      setSaveRules([
        ...saveRules,
        {
          pattern: /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
          message: '请输入正确邮箱',
        },
      ]);
    }
  };

  console.log(saveRules, rulesList);
  return (
    <div>
      <Drawer
        title="校验规则"
        placement="right"
        onClose={onClose}
        visible={visible}
        getContainer={false}
        style={{
          position: 'absolute',
        }}
      >
        <div {...style_}>
          校验格式：
          <Select labelInValue options={rules} {...style_2} onChange={onChange} />
        </div>
        {rulesList.map((item, index) => {
          return Object.keys(item).map((j) => {
            console.log(item[j], j, index);
            return (
              <div key={j + item[j] + index} {...style_}>
                {j}
                {typeof item[j] === 'number' && (
                  <InputNumber
                    defaultValue={item[j]}
                    onChange={(e) => handleInput(e, j, index)}
                    {...style_2}
                  />
                )}
                {typeof item[j] === 'string' && (
                  <Input
                    defaultValue={item[j]}
                    onChange={(e) => handleInput(e.target.value, j, index)}
                    {...style_2}
                  />
                )}
                {typeof item[j] === 'boolean' && (
                  <Switch defaultChecked={item[j]} onChange={(e) => handleInput(e, j, index)} />
                )}
              </div>
            );
          });
        })}
      </Drawer>
    </div>
  );
};
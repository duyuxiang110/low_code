import React, { useEffect } from 'react';
import { Switch, Input } from 'antd';
export default () => {
  const aa = document.querySelector('#aaa');

  const a = list.map((item) => {
    if (!item.type) return;
    switch (item.type) {
      case 'switch':
        return <Switch />;
      case 'input':
        return (
          <Input
            {...item.configs.fieldProperties}
            {...item.configs.componentProperties}
            style={{ ...item.configs.styles }}
          />
        );
    }
  });
  useEffect(() => {
    console.log(aa?.innerHTML);
  });
  return <div id="aaa">{a}</div>;
};
const list = [
  {
    type: 'input',
    StandardInput: {
      Search: {},
      TextArea: {},
      Password: {
        defaultProps: {
          action: 'click',
          visibilityToggle: true,
        },
      },
    },
    configs: {
      fieldProperties: {
        name: 'input',
        label: '标题',
        noStyle: false,
        hidden: false,
        extra: '123',
        rules: [
          {
            require: true,
            message: '',
          },
          {
            max: 0,
            message: '最大长度',
          },
          {
            min: 0,
            message: '最小长度',
          },
        ],
      },
      componentProperties: {
        disabled: false,
        placeholder: '请输入',
        allowClear: false,
        maxLength: 20,
        bordered: true,
        showCount: false,
      },
      styles: {
        width: '',
        height: '',
      },
    },
    id: '6f534cfe-f783-4c41-96b2-da4274d8428d',
  },
  {
    type: 'switch',
    StandardInput: {
      __ANT_SWITCH: true,
    },
    configs: {
      fieldProperties: {
        name: 'switch',
        label: '开关',
        initialValue: false,
        noStyle: false,
        hidden: false,
        rules: [
          {
            require: true,
            message: '',
          },
          {
            max: 0,
            message: '最大长度',
          },
          {
            min: 0,
            message: '最小长度',
          },
        ],
      },
      componentProperties: {
        disabled: false,
        className: 'aaa',
        autoFocus: false,
      },
      styles: {
        width: '',
        height: '',
      },
    },
    id: 'be183a2c-fa7b-46e7-8abb-25be98bcc68f',
  },
  {
    type: 'inputTexArea',
    StandardInput: {},
    configs: {
      fieldProperties: {
        name: 'inputTexArea',
        label: '多行文本',
        noStyle: false,
        hidden: false,
        extra: '456',
        rules: [
          {
            require: true,
            message: '',
          },
          {
            max: 0,
            message: '最大长度',
          },
          {
            min: 0,
            message: '最小长度',
          },
        ],
      },
      componentProperties: {
        disabled: false,
        placeholder: '请输入111',
        rows: 4,
        autoSize: false,
        allowClear: false,
        maxLength: 20,
        showCount: false,
        bordered: true,
      },
      styles: {
        width: '',
        height: '',
      },
    },
    id: 'f67a89fd-6216-4d38-9c6d-33def7b9d458',
  },
];

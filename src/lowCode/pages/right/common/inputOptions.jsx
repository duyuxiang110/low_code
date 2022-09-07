import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';

export default ({ componentProperties }) => {
  const [form] = Form.useForm();
  const onValuesChange = () => {
    const allValues = form.getFieldsValue(true);
    componentProperties['options'] = allValues.options;
  };
  return (
    <div>
      <Form form={form} autoComplete="off" onValuesChange={onValuesChange}>
        <Form.List name="options" initialValue={componentProperties.options}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: 'flex',
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, 'label']}
                    rules={[
                      {
                        required: true,
                        message: '键不能为空',
                      },
                    ]}
                  >
                    <Input addonBefore="键" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'value']}
                    rules={[
                      {
                        required: true,
                        message: '值不能为空',
                      },
                    ]}
                  >
                    <Input addonBefore="值" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  增加配置项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
};

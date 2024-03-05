"use client";

import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";

const onFinish = (values: any) => {
  console.log("Received values of form:", values);
};

export const MultiForm: React.FC = () => {
  const sumOfSomething = (): number => {
    let sum = 0;
    for (let index = 0; index < 90000000; index++) {
      sum += 1;
    }
    return sum;
  };

  console.log("multiii", sumOfSomething());

  return (
    <div>
      <p className="text-black">hello here:{sumOfSomething()}</p>
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        autoComplete="off"
      >
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "first"]}
                    rules={[{ required: true, message: "Missing first name" }]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "last"]}
                    rules={[{ required: true, message: "Missing last name" }]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

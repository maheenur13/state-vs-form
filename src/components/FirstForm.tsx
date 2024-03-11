"use client";

import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export const FirstForm: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const sumOfSomething = (): number => {
    let sum = 0;
    for (let index = 0; index < 90000000; index++) {
      sum += 1;
    }
    return sum;
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    // console.log(event.target.value);
    setInputValue(event.target.value);
  };

  // console.log(sumOfSomething());

  return (
    <div>
      {/* <p className="text-black">hello: {sumOfSomething()}</p> */}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input onChange={handleChange} value={inputValue} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

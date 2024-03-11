"use client";
import { FirstForm, MultiForm, TableFormEx } from "@/components";
import { Col, Collapse, CollapseProps, Row } from "antd";
import Image from "next/image";

export default function Home() {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <h3 className="text-base ">With state</h3>,
      children: <FirstForm />,
    },
    {
      key: "2",
      label: <h3 className="text-base ">With Form</h3>,

      children: <MultiForm />,
    },
    {
      key: "3",
      label: <h3 className="text-base ">Table Form</h3>,

      children: <TableFormEx />,
    },
  ];

  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return (
    <main className=" min-h-screen  p-24">
      <Row gutter={24}>
        <Col span={12} className="mb-4">
          <Collapse
            items={[items[0]]}
            defaultActiveKey={["1"]}
            onChange={onChange}
          />
        </Col>
        <Col span={12} className="mb-4">
          <Collapse
            items={[items[1]]}
            defaultActiveKey={["1"]}
            onChange={onChange}
          />
        </Col>
        <Col span={12} className="mb-4">
          <Collapse
            items={[items[2]]}
            defaultActiveKey={["1"]}
            onChange={onChange}
          />
        </Col>
      </Row>
    </main>
  );
}

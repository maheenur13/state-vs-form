import { FirstForm, MultiForm } from "@/components";
import { Col, Row } from "antd";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" min-h-screen  p-24">
      <Row>
        <Col span={12}>
          <FirstForm />
        </Col>
        <Col span={12}>
          <MultiForm />
        </Col>
      </Row>
    </main>
  );
}

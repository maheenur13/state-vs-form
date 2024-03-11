import { TableForm } from "@/engine/TableForm";
import { Button, Popconfirm, Table } from "antd";
import React, { FC, useState } from "react";

interface DataType {
  key: React.Key;
  name: string;
  age: string;
  address: string;
}

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export const TableFormEx: FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: "0",
      name: "Edward King 0",
      age: "32",
      address: "London, Park Lane no. 0",
    },
    {
      key: "1",
      name: "Edward King 1",
      age: "32",
      address: "London, Park Lane no. 1",
    },
  ]);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
    type?: "text" | "editor" | "number";
  })[] = [
    {
      title: "name",
      dataIndex: "name",
      width: "30%",
      editable: true,
      type: "text",
    },
    {
      title: "age",
      dataIndex: "age",
      editable: true,
    },
    {
      title: "address",
      dataIndex: "address",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    // console.log(Number(dataSource[dataSource.length - 1].key));

    const newData: DataType = {
      key: Number(dataSource[dataSource.length - 1].key) + 1,
      name: `Edward King ${Number(dataSource[dataSource.length - 1].key) + 1}`,
      age: "32",
      address: `London, Park Lane no. ${
        Number(dataSource[dataSource.length - 1].key) + 1
      }`,
    };
    setDataSource([...dataSource, newData]);
  };

  //   console.log({ dataSource });

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <TableForm
        dataSource={dataSource}
        handleDelete={handleDelete}
        setDataSource={setDataSource}
        defaultColumns={defaultColumns}
      />
    </div>
  );
};

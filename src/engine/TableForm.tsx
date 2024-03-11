import React, { useContext, useEffect, useRef, useState } from "react";
import type { GetRef } from "antd";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnGroupType, ColumnType } from "antd/es/table";

type InputRef = GetRef<typeof Input>;
type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  type: "text" | "editor" | "number";
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  type,
  handleSave,
  ...restProps
}) => {
  console.log({ type });

  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

type DataType = {
  key: React.Key;
  [key: string]: any; // Allow any additional properties
};

type PropsType<T extends DataType> = {
  dataSource: T[];
  handleDelete: (key: React.Key) => void;
  setDataSource: React.Dispatch<React.SetStateAction<T[]>>;
  defaultColumns: ((ColumnGroupType<AnyObject> | ColumnType<AnyObject>) & {
    editable?: boolean | undefined;
    dataIndex: string;
    type?: "text" | "editor" | "number";
  })[];
};

export const TableForm = <T extends DataType>({
  dataSource,
  handleDelete,
  setDataSource,
  defaultColumns,
}: PropsType<T>) => {
  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        type: col.type,
        handleSave,
      }),
    };
  });
  //   console.log("olaaaa");

  return (
    <div>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

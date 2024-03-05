"use client";
import React, { FC, ReactNode } from "react";
import { AntdRegistry as AntdRegistryProvider } from "@ant-design/nextjs-registry";
import { StyleProvider } from "@ant-design/cssinjs";

export const AntdRegistry: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AntdRegistryProvider>
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </AntdRegistryProvider>
  );
};

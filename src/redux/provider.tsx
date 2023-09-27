"use client";

import { Provider } from "react-redux";
import React, { PropsWithChildren } from "react";
import { store } from "./store";

const ReduxProvider = ({ children }: { children: PropsWithChildren<any> }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;

import {
  AndroidOutlined,
  FormOutlined,
  EditTwoTone,
  FieldBinaryOutlined,
  ProfileOutlined,
  MergeCellsOutlined,
  ScheduleOutlined,
  DownloadOutlined,
  CrownOutlined,
  PauseCircleTwoTone,
  MinusOutlined,
  CheckSquareTwoTone,
  CheckCircleTwoTone,
  AlignLeftOutlined,
  StarTwoTone,
  CalendarTwoTone,
} from "@ant-design/icons";
import React from "react";
const style_ = {
  style: {
    fontSize: 24,
    color: "#40a9ff",
  },
};
export const icon = {
  input: {
    label: "输入框",
    value: <EditTwoTone {...style_} />,
  },
  inputTexArea: {
    label: "多行输入",
    value: <FormOutlined {...style_} />,
  },
  inputNumber: {
    label: "数字框",
    value: <FieldBinaryOutlined {...style_} />,
  },
  select: {
    label: "选择器",
    value: <ProfileOutlined {...style_} />,
  },
  cascader: {
    label: "联级选择",
    value: <MergeCellsOutlined {...style_} />,
  },
  treeSelect: {
    label: "树选择",
    value: <AlignLeftOutlined {...style_} />,
  },
  checkboxGroup: {
    label: "多选框",
    value: <CheckSquareTwoTone {...style_} />,
  },
  checkbox: {
    label: "勾选开关",
    value: <AndroidOutlined {...style_} />,
  },
  radioGroup: {
    label: "单选",
    value: <CheckCircleTwoTone {...style_} />,
  },
  datePicker: {
    label: "日期",
    value: <ScheduleOutlined {...style_} />,
  },
  rangePicker: {
    label: "日期2",
    value: <CalendarTwoTone {...style_} />,
  },
  upload: {
    label: "上传",
    value: <DownloadOutlined {...style_} />,
  },
  switch: {
    label: "开关",
    value: <PauseCircleTwoTone {...style_} />,
  },
  button: {
    label: "按钮",
    value: <CrownOutlined {...style_} />,
  },
  slider: {
    label: "滑动输入条",
    value: <MinusOutlined {...style_} />,
  },
  rate: {
    label: "评分",
    value: <StarTwoTone {...style_} />,
  },
};

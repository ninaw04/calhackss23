import * as hmUI from "@zos/ui";
import { px } from "@zos/utils";

import {
  DEFAULT_COLOR,
  DEFAULT_COLOR_TRANSPARENT,
} from "../utils/config/constants";
import { DEVICE_WIDTH } from "../utils/config/device";

export const PUT_BUTTON = {
  x: (140),
  y: px(280),
  w: px(200),
  h: px(50),
  text_size: px(36),
  radius: px(12),
  normal_color: 0xFF69B4,
  press_color: 0xFF69B4,
  text: "Put",
};

export const GET_BUTTON = {
  x: (140),
  y: px(140),
  w: px(200),
  h: px(50),
  text_size: px(36),
  radius: px(12),
  normal_color: 0xFF69B4,
  press_color: 0xFF69B4,
  text: "Get",
};

export const GET_RESULT_TEXT = {
  x: px(50),
  y: px(100),
  w: DEVICE_WIDTH - 2 * px(50),
  h: px(160),
  color: 0xffffff,
  text_size: px(36),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  text_style: hmUI.text_style.WRAP,
};

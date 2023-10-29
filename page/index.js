import * as hmUI from "@zos/ui";
import { log as Logger } from "@zos/utils";
import { BasePage } from "@zeppos/zml/base-page";
import {
  PUT_BUTTON,
  GET_BUTTON,
  GET_RESULT_TEXT,
} from "zosLoader:./index.[pf].layout.js";

const logger = Logger.getLogger("fetch_api");

let textWidget;
Page(
  BasePage({
    state: {},
    build() {
      hmUI.createWidget(hmUI.widget.BUTTON, {
        ...PUT_BUTTON,
        click_func: (button_widget) => {
          logger.log("click button");
          this.postData();
        },
      });
      hmUI.createWidget(hmUI.widget.BUTTON, {
        ...GET_BUTTON,
        click_func: (button_widget) => {
          logger.log("click button");
          this.fetchData();
        },
      });
    },
    fetchData() {
      this.request({
        method: "GET_DATA",
      })
        .then((data) => {
          logger.log("receive data");
          const { result = {} } = data;
          const { text } = result;
          if (!textWidget) {
            textWidget = hmUI.createWidget(hmUI.widget.TEXT, {
              ...GET_RESULT_TEXT,
              text,
            });
          } else {
            textWidget.setProperty(hmUI.prop.TEXT, text);
          }
        })
        .catch((res) => {});
    },
    // postData() {
    //   this.request({
    //     method: "GET_DATA"
    //   })
    //   .then((data) => {
    //     logger.log("receive data");
    //     const { result = {} } = data;
    //     const { text } = result;
    //   })
    // }
  })
);

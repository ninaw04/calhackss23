import * as hmUI from "@zos/ui";
import { log as Logger } from "@zos/utils";
import { BasePage } from "@zeppos/zml/base-page";
import { url } from "./const";

// import { layout } from 'zosLoader:./index.[pf].layout.js'
import { Geolocation } from "@zos/sensor";
import {
  PUT_BUTTON,
  GET_BUTTON,
  GET_RESULT_TEXT,
} from "zosLoader:./index.[pf].layout.js";

const logger = Logger.getLogger("fetch_api");
const geolocation = new Geolocation();

let textWidget;
Page(
  BasePage({
    state: {},
    onInit() {
      const callback = () => {
        console.log('pos_status', geolocation.getStatus())

        const lat = geolocation.getLatitude();
        const long = geolocation.getLongitude();
        this.syncData({
          lat,
          long
        })
      }
      geolocation.start();
      geolocation.onChange(callback);

      logger.log('page onInit invoked');
    },
    build() {

      hmUI.createWidget(hmUI.widget.BUTTON, {
        ...PUT_BUTTON,
        click_func: (button_widget) => {
          logger.log("click button");
          // this.postData();
        },
      });
      hmUI.createWidget(hmUI.widget.BUTTON, {
        ...GET_BUTTON,
        click_func: (button_widget) => {
          logger.log("click button");
          this.fetchData();
        },
      });
      // layout.render(this);
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


    syncData(data) {
      // layout.updateTxtUploading()
      console.log("changing data");
      return this.httpRequest({
        method: 'post',
        url: `${url}/locationData`,
        body: data,
      })
      .then((result) => {
        // layout.updateTxtSuccess()
        logger.log('result => %j', result)
      })
      .catch((error) => {
        // layout.updateTxtError()
        logger.error('error => %j', error);
      })
    },
    onDestroy() {
      logger.log('page onDestroy invoked')
    }

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

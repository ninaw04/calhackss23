import { BaseSideService } from "@zeppos/zml/base-side";

const padStart = (str, maxLength, fillStr = "0") => {
  return str.toString().padStart(maxLength, fillStr);
};

const formatData = (data) => {
  const long = data.longitude;
  const lat = date.latitude;
  const time = date.time;
  const isSafe = date.isSafe;

  return `longitude: ${long} and latitude: ${lat}\ntime: ${time}`;
};

async function fetchData(res) {
  try {
      console.log("fetching data");
    // const { body: { data = {} } = {} } = await fetch({
      let url = 'https://us-east-1.aws.data.mongodb-api.com/app/application-1-vghrw/endpoint/data';
      let options = 'GET'
      fetch(url, options)
      .then(response => response.json())
      .then(json => data = json[0])
    res(null, {
      result: { text: `longitude: ${data.long} latitude: ${data.lat}  ` },
    });
  } catch (error) {
    res(null, {
      result: "ERROR",
    });
  }
};

async function postData(res) {
  try{
    const { body: { data = {} } = {} } = await fetch({
        url: 'https://us-east-1.aws.data.mongodb-api.com/app/application-1-vghrw/endpoint/locationData',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: 'Hello Zepp OS'
        })
      })
    } catch (error) {
      res(null, {
      result: "ERROR",
    });
  };
}

AppSideService(
  BaseSideService({
    onInit() {},

    onRequest(req, res) {
      console.log("=====>,", req.method);
      if (req.method === "GET_DATA") {
        fetchData(res);
      }
    },

    onRun() {},

    onDestroy() {},
  })
);

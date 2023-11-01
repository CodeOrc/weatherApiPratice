import {
  WiCloud,
  WiDayCloudy,
  WiFog,
  WiDayFog,
  WiDayRainWind,
  WiRain,
  WiDaySunny,
  WiDayStormShowers,
  WiDayShowers,
  WiDaySleetStorm,
  WiSnow
} from "react-icons/wi";

const Authorization = "CWB-DA6E0DCB-C390-45DD-8016-820F710CBDBD";

const getWeatherIcon = (wxNum) => {
  switch (wxNum) {
    case 1:
    case 2:
      return <WiDaySunny />;
    case 3:
    case 4:
      return <WiDayCloudy />;
    case 5:
    case 6:
    case 7:
      return <WiCloud />;
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
      return <WiRain />;
    case 15:
    case 16:
    case 17:
    case 18:
      return <WiDayStormShowers />;
    case 19:
    case 20:
    case 21:
    case 22:
      return <WiDayRainWind />;
    case 23:
      return <WiRain />;
    case 24:
      return <WiFog />;
    case 25:
    case 26:
    case 27:
    case 28:
      return <WiDayFog />;
    case 29:
    case 30:
    case 31:
    case 32:
      return <WiDayShowers />;
    case 33:
    case 34:
    case 35:
    case 36:
      return <WiDayStormShowers />;
    case 37:
    case 38:
    case 39:
    case 40:
      return <WiDaySleetStorm />;
    case 41:
    case 42:
      return <WiSnow />;
    default:
      break;
  }
};
const getParameter = (weatherElements, eleName) => {
  const [ele] = weatherElements.filter((v) => {
    return v.elementName === eleName;
  });
  return ele.time[0].parameter.parameterName;
};

const getWxNum = (weatherElements) => {
  const [ele] = weatherElements.filter((v) => {
    return v.elementName === "Wx";
  });
  return Number(ele.time[0].parameter.parameterValue);
};

const getOneDayWeatherByLocation = async (location, setState) => {
  if (!location) {
    location = "臺北市";
  }
  await fetch(
    `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${Authorization}&locationName=${location}&elementName=Wx,PoP,MinT,MaxT`
  )
    .then((res) => {
      return res.json();
    })
    .then((r) => {
      if (r.success === "true") {
        const weatherElements = r.records.location[0].weatherElement;
        let data = {
          locationName: location,
          elements: {
            date: weatherElements[0].time[0].startTime,
            MinT: getParameter(weatherElements, "MinT"),
            MaxT: getParameter(weatherElements, "MaxT"),
            PoP12h: getParameter(weatherElements, "PoP"),
            Wx: getParameter(weatherElements, "Wx"),
            wxIcon: getWeatherIcon(getWxNum(weatherElements))
          }
        };

        setState(data);
      }
    });
};

//依地區取得一周天氣
const getWeatherByLocation = async (location, setState) => {
  if (!location) {
    location = "臺北市";
  }
  await fetch(
    `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=${Authorization}&locationName=${location}&elementName=MinT,MaxT,PoP12h,Wx`
  )
    .then((res) => {
      return res.json();
    })
    .then((r) => {
      if (r.success === "true") {
        let data = { locationName: "", elements: [] };
        data.locationName = r.records.locations[0].location[0].locationName;
        data.elements = organizeWeatherElement(
          r.records.locations[0].location[0].weatherElement
        );
        setState(data);
      }
    });
};

//整理天氣資訊用
const organizeWeatherElement = (weatherElement) => {
  let arr = [];
  for (var i = 0; i <= weatherElement[0].time.length; i++) {
    if (weatherElement[0].time[i].startTime.includes("06:00:00")) {
      let ele = { date: "", MinT: "", MaxT: "", PoP12h: "", Wx: "" };
      ele.date = weatherElement[0].time[i].startTime.split(" ")[0];
      for (let element of weatherElement) {
        switch (element.elementName) {
          case "MaxT":
            ele.MaxT = element.time[i].elementValue[0].value;
            break;
          case "MinT":
            ele.MinT = element.time[i].elementValue[0].value;
            break;
          case "Wx":
            ele.Wx = element.time[i].elementValue[0].value;
            break;
          case "PoP12h":
            ele.PoP12h = element.time[i].elementValue[0].value;
            break;
          default:
            break;
        }
        arr.push(ele);
      }
    }
  }
  return arr;
};

const dateFormat = (date) => {
  const day = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  const d = new Date(date);
  return `${d.getMonth() + 1}/${d.getDate().toString().padStart(2, "0")} ${
    day[d.getDay()]
  }`;
};

export {
  getWeatherByLocation,
  organizeWeatherElement,
  getOneDayWeatherByLocation,
  dateFormat,
  getWeatherIcon
};

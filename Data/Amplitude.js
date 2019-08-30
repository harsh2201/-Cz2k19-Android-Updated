// import { Amplitude } from "expo";
let isInitialized = false;
export function init() {
  if (isInitialized) {
    return;
  }
  Expo.Amplitude.initialize("8835b84a3a8e76b523555b7644ce8561");
  isInitialized = true;
  console.log("initialize");
}
export function track(event, properties) {
  init();
  if (properties) {
    Expo.Amplitude.logEventWithProperties(event, properties);
      console.log(event,properties);
  } else {
    Expo.Amplitude.logEvent(event);
    console.log(event);
  }
}
export default track;

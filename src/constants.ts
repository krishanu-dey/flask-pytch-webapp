export const stageWidth: number = 500;
export const stageHeight: number = 500;

export const stageHalfWidth: number = 0.5 * stageWidth;
export const stageHalfHeight: number = 0.5 * stageHeight;

export const liveReloadEnabled =
  process.env.REACT_APP_ENABLE_LIVE_RELOAD_WEBSOCKET === "yes";

export const liveReloadURL = "ws://127.0.0.1:4111/";

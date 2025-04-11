const ENV = {
  dev: {
    API_URL: "http://localhost:9090/api/matchplay",
    WEBSOCKET_URL: "ws://localhost:9091/api/matchplay/buildrun-livechat-websocket",
  },
  prod: {
    API_URL: "https://api.matchplay.cloud:9090/api/matchplay",
    WEBSOCKET_URL: "ws://api.matchplay.cloud:9091/api/matchplay/buildrun-livechat-websocket",
  },
};

const getEnvVars = () => (__DEV__ ? ENV.dev : ENV.prod);

export default getEnvVars();

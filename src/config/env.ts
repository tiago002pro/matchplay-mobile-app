const ENV = {
  dev: {
    API_URL: "http://localhost:9090/api/matchplay",
    WEBSOCKET_URL: "ws://localhost:9091/api/matchplay/buildrun-livechat-websocket",
  },
  prod: {
    API_URL: "http://148.230.124.49:9090/api/matchplay",
    WEBSOCKET_URL: "ws://148.230.124.49:9091/api/matchplay/buildrun-livechat-websocket",
  },
};

const getEnvVars = () => (__DEV__ ? ENV.dev : ENV.prod);

export default getEnvVars();

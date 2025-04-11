export default ({ config }) => {
  const ENV = process.env.EXPO_PUBLIC_ENVIRONMENT || "development";

  const envConfig = {
    development: {
      API_URL: "http://localhost:9090/api/matchplay",
      WEBSOCKET_URL: "ws://localhost:9091/api/matchplay/buildrun-livechat-websocket",
    },
    production: {
      API_URL: "https://api.matchplay.cloud:9090/api/matchplay",
      WEBSOCKET_URL: "wss://api.matchplay.cloud:9091/api/matchplay/buildrun-livechat-websocket",
    },
  };

  return {
    ...config,
    extra: {
      ...envConfig[ENV],
      environment: ENV,
    },
  };
};

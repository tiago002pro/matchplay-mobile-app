export default ({ config }) => {
  const ENV = process.env.EXPO_PUBLIC_ENVIRONMENT || "development";

  return {
    ...config,
    extra: {
      API_URL: process.env.EXPO_PUBLIC_API_URL,
      WEBSOCKET_URL: process.env.EXPO_PUBLIC_WEBSOCKET_URL,
      environment: ENV,
      eas: {
        projectId: "e500cf03-efe4-4f15-afa4-fb851c399e56",
      },
    },
  };
};

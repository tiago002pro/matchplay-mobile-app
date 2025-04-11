declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
declare module '@env' {
  export const EXPO_PUBLIC_API_URL: string;
  export const EXPO_PUBLIC_WEBSOCKET_URL: string;
  export const EXPO_PUBLIC_ENVIRONMENT: string;
}

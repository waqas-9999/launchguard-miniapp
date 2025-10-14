// Allow importing .jsx files from TypeScript
declare module "*.jsx" {
  import type { ComponentType } from "react";
  const Component: ComponentType<any>;
  export default Component;
}

// Minimal Telegram WebApp typings used in the app
declare global {
  interface TelegramWebAppApi {
    expand: () => void;
    disableVerticalSwipes?: () => void;
  }

  interface TelegramApi {
    WebApp?: TelegramWebAppApi;
  }

  interface Window {
    Telegram?: TelegramApi;
  }
}

export {};

// Explicit module shims for JSX view/components imported by TS files
declare module "./components/global/ScrolTop.jsx" {
  import type { ComponentType } from "react";
  const Component: ComponentType<any>;
  export default Component;
}
declare module "./views/Dino.jsx" {
  import type { ComponentType } from "react";
  const Component: ComponentType<any>;
  export default Component;
}
declare module "./views/Friends.jsx" {
  import type { ComponentType } from "react";
  const Component: ComponentType<any>;
  export default Component;
}
declare module "./views/Leaderboard.jsx" {
  import type { ComponentType } from "react";
  const Component: ComponentType<any>;
  export default Component;
}
declare module "./views/Home.jsx" {
  import type { ComponentType } from "react";
  const Component: ComponentType<any>;
  export default Component;
}
declare module "./views/GetBcx.jsx" {
  import type { ComponentType } from "react";
  const Component: ComponentType<any>;
  export default Component;
}
declare module "./views/Transaction.jsx" {
  import type { ComponentType } from "react";
  const Component: ComponentType<any>;
  export default Component;
}



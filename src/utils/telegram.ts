// Telegram Web App utilities
export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: TelegramUser;
    auth_date: number;
    hash: string;
  };
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  isClosingConfirmationEnabled: boolean;
  BackButton: {
    isVisible: boolean;
    show(): void;
    hide(): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    setText(text: string): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
    showProgress(leaveActive?: boolean): void;
    hideProgress(): void;
    setParams(params: {
      text?: string;
      color?: string;
      text_color?: string;
      is_active?: boolean;
      is_visible?: boolean;
    }): void;
  };
  HapticFeedback: {
    impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void;
    notificationOccurred(type: 'error' | 'success' | 'warning'): void;
    selectionChanged(): void;
  };
  ready(): void;
  expand(): void;
  close(): void;
  sendData(data: string): void;
  switchInlineQuery(query: string, choose_chat_types?: string[]): void;
  openLink(url: string, options?: { try_instant_view?: boolean }): void;
  openTelegramLink(url: string): void;
  openInvoice(url: string, callback?: (status: string) => void): void;
  showPopup(params: {
    title?: string;
    message: string;
    buttons?: Array<{
      id?: string;
      type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
      text?: string;
    }>;
  }, callback?: (buttonId: string) => void): void;
  showAlert(message: string, callback?: () => void): void;
  showConfirm(message: string, callback?: (confirmed: boolean) => void): void;
  showScanQrPopup(params: {
    text?: string;
  }, callback?: (text: string) => void): void;
  closeScanQrPopup(): void;
  readTextFromClipboard(callback?: (text: string) => void): void;
  requestWriteAccess(callback?: (granted: boolean) => void): void;
  requestContact(callback?: (granted: boolean) => void): void;
  disableVerticalSwipes(): void;
  enableVerticalSwipes(): void;
  disableHorizontalSwipes(): void;
  enableHorizontalSwipes(): void;
  setHeaderColor(color: string): void;
  setBackgroundColor(color: string): void;
  enableClosingConfirmation(): void;
  disableClosingConfirmation(): void;
  onEvent(eventType: string, eventHandler: () => void): void;
  offEvent(eventType: string, eventHandler: () => void): void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export class TelegramWebAppManager {
  private tg: TelegramWebApp | null = null;
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  private initialize() {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      this.tg = window.Telegram.WebApp;
      this.isInitialized = true;
      console.log('Telegram Web App Manager initialized');
    } else {
      console.warn('Telegram Web App not available');
    }
  }

  public isAvailable(): boolean {
    return this.isInitialized && this.tg !== null;
  }

  public isProperMiniApp(): boolean {
    return this.isAvailable() && !!(this.tg?.initData && this.tg.initData.length > 0);
  }

  public getUser(): TelegramUser | null {
    if (!this.isAvailable()) return null;
    return this.tg?.initDataUnsafe?.user || null;
  }

  public getInitData(): string {
    if (!this.isAvailable()) return '';
    return this.tg?.initData || '';
  }

  public setupMiniApp(): void {
    if (!this.isAvailable()) {
      console.warn('Telegram Web App not available for setup');
      return;
    }

    // Signal that the app is ready
    this.tg!.ready();
    
    // Expand to full screen
    this.tg!.expand();

    if (this.isProperMiniApp()) {
      console.log('Setting up as proper Telegram Mini App');
      this.setupProperMiniApp();
    } else {
      console.log('Setting up as web page in Telegram browser');
      this.setupWebPageMode();
    }
  }

  private setupProperMiniApp(): void {
    if (!this.tg) return;

    // Disable gestures that could minimize the app
    if (typeof this.tg.disableVerticalSwipes === 'function') {
      this.tg.disableVerticalSwipes();
    }

    if (typeof (this.tg as any).disableHorizontalSwipes === 'function') {
      (this.tg as any).disableHorizontalSwipes();
    }

    if (typeof (this.tg as any).disablePullToRefresh === 'function') {
      (this.tg as any).disablePullToRefresh();
    }

    // Set theme colors
    if (typeof (this.tg as any).setHeaderColor === 'function') {
      (this.tg as any).setHeaderColor('#0B0C0E');
    }

    if (typeof (this.tg as any).setBackgroundColor === 'function') {
      (this.tg as any).setBackgroundColor('#000000');
    }

    // Enable closing confirmation
    if (typeof (this.tg as any).enableClosingConfirmation === 'function') {
      (this.tg as any).enableClosingConfirmation();
    }

    // Hide back button initially
    if (this.tg.BackButton && typeof this.tg.BackButton.hide === 'function') {
      this.tg.BackButton.hide();
    }

    // Configure main button
    if (this.tg.MainButton) {
      this.tg.MainButton.hide();
    }
  }

  private setupWebPageMode(): void {
    // Apply extra protection for web page mode
    if (typeof document !== 'undefined') {
      document.body.style.overscrollBehavior = 'none';
      document.body.style.touchAction = 'manipulation';
    }
  }

  public showMainButton(text: string, onClick: () => void): void {
    if (!this.isAvailable() || !this.tg?.MainButton) return;

    this.tg.MainButton.setText(text);
    this.tg.MainButton.onClick(onClick);
    this.tg.MainButton.show();
  }

  public hideMainButton(): void {
    if (!this.isAvailable() || !this.tg?.MainButton) return;
    this.tg.MainButton.hide();
  }

  public showBackButton(onClick: () => void): void {
    if (!this.isAvailable() || !this.tg?.BackButton) return;
    this.tg.BackButton.onClick(onClick);
    this.tg.BackButton.show();
  }

  public hideBackButton(): void {
    if (!this.isAvailable() || !this.tg?.BackButton) return;
    this.tg.BackButton.hide();
  }

  public hapticFeedback(type: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'light'): void {
    if (!this.isAvailable() || !this.tg?.HapticFeedback) return;
    this.tg.HapticFeedback.impactOccurred(type);
  }

  public showAlert(message: string): Promise<void> {
    return new Promise((resolve) => {
      if (!this.isAvailable() || !this.tg?.showAlert) {
        alert(message);
        resolve();
        return;
      }
      this.tg.showAlert(message, resolve);
    });
  }

  public showConfirm(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.isAvailable() || !this.tg?.showConfirm) {
        resolve(confirm(message));
        return;
      }
      this.tg.showConfirm(message, resolve);
    });
  }

  public close(): void {
    if (!this.isAvailable() || !this.tg?.close) return;
    this.tg.close();
  }
}

// Export singleton instance
export const telegramWebApp = new TelegramWebAppManager();

/**
 * PWA Manager - Handles PWA installation prompts and updates
 * Manages the beforeinstallprompt event and service worker updates
 */

class PWAManager {
  constructor() {
    this.deferredPrompt = null;
    this.isInstalled = false;
    this.updateAvailable = false;
    this.registration = null;
    
    this.init();
  }

  /**
   * Initialize PWA manager
   */
  init() {
    // Check if app is already installed
    this.checkInstallStatus();
    
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('PWA: Install prompt available');
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton();
    });

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      console.log('PWA: App was installed');
      this.isInstalled = true;
      this.hideInstallButton();
      this.deferredPrompt = null;
    });

    // Register service worker and listen for updates
    this.registerServiceWorker();
    
    // Listen for service worker updates
    this.listenForUpdates();
  }

  /**
   * Check if the app is installed
   */
  checkInstallStatus() {
    // Check if running in standalone mode (installed)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.isInstalled = true;
      console.log('PWA: App is running in standalone mode');
    }
    
    // Check for iOS standalone mode
    if (window.navigator.standalone === true) {
      this.isInstalled = true;
      console.log('PWA: App is running in iOS standalone mode');
    }
  }

  /**
   * Show install button
   */
  showInstallButton() {
    const installButton = document.getElementById('pwa-install-button');
    if (installButton) {
      installButton.style.display = 'block';
      installButton.addEventListener('click', () => this.promptInstall());
    } else {
      // Create install button if it doesn't exist
      this.createInstallButton();
    }
  }

  /**
   * Hide install button
   */
  hideInstallButton() {
    const installButton = document.getElementById('pwa-install-button');
    if (installButton) {
      installButton.style.display = 'none';
    }
  }

  /**
   * Create install button dynamically
   */
  createInstallButton() {
    const button = document.createElement('button');
    button.id = 'pwa-install-button';
    button.innerHTML = `
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
      </svg>
      Installer l'app
    `;
    button.className = 'fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center transition-colors z-50';
    button.addEventListener('click', () => this.promptInstall());
    
    document.body.appendChild(button);
  }

  /**
   * Prompt user to install the app
   */
  async promptInstall() {
    if (!this.deferredPrompt) {
      console.log('PWA: No install prompt available');
      return;
    }

    try {
      // Show the install prompt
      this.deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await this.deferredPrompt.userChoice;
      
      console.log(`PWA: User response to install prompt: ${outcome}`);
      
      if (outcome === 'accepted') {
        console.log('PWA: User accepted the install prompt');
      } else {
        console.log('PWA: User dismissed the install prompt');
      }
      
      // Clear the deferredPrompt
      this.deferredPrompt = null;
      this.hideInstallButton();
    } catch (error) {
      console.error('PWA: Error showing install prompt:', error);
    }
  }

  /**
   * Register service worker
   */
  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.register('/sw.js');
        console.log('PWA: Service Worker registered successfully');
        
        // Check for updates immediately
        this.registration.addEventListener('updatefound', () => {
          console.log('PWA: New service worker found');
          this.handleServiceWorkerUpdate();
        });
        
      } catch (error) {
        console.error('PWA: Service Worker registration failed:', error);
      }
    }
  }

  /**
   * Listen for service worker updates
   */
  listenForUpdates() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('PWA: New service worker activated');
        window.location.reload();
      });
    }
  }

  /**
   * Handle service worker update
   */
  handleServiceWorkerUpdate() {
    const newWorker = this.registration.installing;
    
    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        console.log('PWA: New content available');
        this.updateAvailable = true;
        this.showUpdateNotification();
      }
    });
  }

  /**
   * Show update notification
   */
  showUpdateNotification() {
    // Create update notification
    const notification = document.createElement('div');
    notification.id = 'pwa-update-notification';
    notification.innerHTML = `
      <div class="bg-blue-600 text-white p-4 rounded-lg shadow-lg flex items-center justify-between">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          <span>Nouvelle version disponible!</span>
        </div>
        <div>
          <button id="pwa-update-button" class="bg-white text-blue-600 px-3 py-1 rounded mr-2 hover:bg-gray-100">
            Mettre à jour
          </button>
          <button id="pwa-dismiss-button" class="text-blue-200 hover:text-white">
            ×
          </button>
        </div>
      </div>
    `;
    notification.className = 'fixed top-4 right-4 z-50';
    
    document.body.appendChild(notification);
    
    // Add event listeners
    document.getElementById('pwa-update-button').addEventListener('click', () => {
      this.applyUpdate();
    });
    
    document.getElementById('pwa-dismiss-button').addEventListener('click', () => {
      notification.remove();
    });
  }

  /**
   * Apply service worker update
   */
  applyUpdate() {
    if (this.registration && this.registration.waiting) {
      // Tell the waiting service worker to skip waiting
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  }

  /**
   * Check for updates manually
   */
  async checkForUpdates() {
    if (this.registration) {
      try {
        await this.registration.update();
        console.log('PWA: Checked for updates');
      } catch (error) {
        console.error('PWA: Error checking for updates:', error);
      }
    }
  }

  /**
   * Get installation status
   */
  getInstallStatus() {
    return {
      isInstalled: this.isInstalled,
      canInstall: !!this.deferredPrompt,
      updateAvailable: this.updateAvailable
    };
  }
}

// Export for use in other modules
export default PWAManager;

// Auto-initialize if running in browser
if (typeof window !== 'undefined') {
  window.pwaManager = new PWAManager();
}
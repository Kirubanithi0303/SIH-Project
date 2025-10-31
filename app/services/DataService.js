class DataService {
  static instance = null;
  
  static getInstance() {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  constructor() {
    this.listeners = [];
    this.isRunning = false;
  }

  startRealTimeUpdates() {
    if (this.isRunning) return;
    this.isRunning = true;
    
    this.interval = setInterval(() => {
      const updates = this.generateRandomUpdates();
      this.notifyListeners(updates);
    }, 5000);
  }

  stopRealTimeUpdates() {
    if (this.interval) {
      clearInterval(this.interval);
      this.isRunning = false;
    }
  }

  generateRandomUpdates() {
    const updates = [];
    const numUpdates = Math.floor(Math.random() * 10) + 5;
    
    for (let i = 0; i < numUpdates; i++) {
      const stationId = Math.floor(Math.random() * 5000) + 1;
      const change = (Math.random() - 0.5) * 0.5;
      updates.push({
        stationId,
        waterLevelChange: change,
        timestamp: new Date().toISOString()
      });
    }
    return updates;
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  notifyListeners(updates) {
    this.listeners.forEach(callback => callback(updates));
  }
}

export default DataService;
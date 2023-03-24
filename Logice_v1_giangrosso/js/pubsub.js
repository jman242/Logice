const bus = {};

class PubSub {
  subscribe(event, callback) {
    if (!Array.isArray(bus[event])) {
      bus[event] = [];
    }
    bus[event].push(callback);
  }

  publish(event, ...args) {
    if (!bus[event]) return;
    bus[event].forEach((callback) => callback(...args));
  }
}

window.bus = new PubSub();
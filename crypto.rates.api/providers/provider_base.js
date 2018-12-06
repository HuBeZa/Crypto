class ProviderBase {
  constructor(name) {
    this.name = name;
  }

  async getMidRate(pair) {
    throw new Error("Method must be implemented in derived class");
  }
}

module.exports = ProviderBase;
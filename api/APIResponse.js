module.exports = class APIResponse {
  constructor(error, data, userMessage = null) {
    this.error = error;
    this.data = data;
    this.userMessage = userMessage;
  }
  toString() {
    return JSON.stringify({
      error: this.error,
      data: this.data,
      userMessage: this.userMessage
    });
  }
};

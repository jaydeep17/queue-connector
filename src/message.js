'use strict';

const availableProviders = require('./providers/available-providers');

/**
 * A wrapper class that contains the message object from all the provider types
 */
class Message {

  /**
   * Creates the message object
   * @param data The actual message object received from the providers
   * @param provider The provider
   */
  constructor(data, provider) {
    this.data = data;
    this.provider = provider;
  }

  /**
   * Returns the body of the message
   * @returns {string}
   */
  get body() {
    const providerName = this.provider.providerName;
    switch (providerName) {
      case availableProviders.AZURE:
        return this.data.body;
      case availableProviders.AWS:
        return this.data.Messages[0].Body;
      default:
        throw new Error('provider not registered in message class');
    }
  }

  /**
   * Returns the body as JSON
   * NOTE: throws an exception when the data isn't a valid JSON
   * @returns {{}}
   */
  get bodyAsJSON() {
    const body = this.body;
    return JSON.parse(body);
  }

  /**
   * Removes the message, from the queue
   * @param cb The callback to call when the message has been removed
   */
  remove(cb) {
    const providerName = this.provider.providerName;
    switch (providerName) {
      case availableProviders.AZURE:
        return this.provider.deleteMessage(this.data, cb);
      case availableProviders.AWS:
        return this.provider.deleteMessage(this.data.Messages[0], cb);
      default:
        throw new Error('provider not registered in message class');
    }
  }

}

module.exports = Message;

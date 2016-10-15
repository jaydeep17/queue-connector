'use strict';

const azure = require('azure-sb');
const AbstractProvider = require('../provider');
const availableProviders = require('./available-providers');

/**
 * Uses Azure service bus as the underlying queue
 */
class AzureProvider extends AbstractProvider {

  /**
   * The constructor establishes the connection the the queue
   * @param connStr Connection string of the service bus namespace
   * @param queueName The name of an already created queue
   */
  constructor(connStr, queueName) {
    super();
    if (!connStr) throw new Error('Must provide connection string');
    if (!queueName) throw new Error('Must provide queue name');

    this.sbService = azure.createServiceBusService(connStr);
    this.queueName = queueName;
  }

  /**
   * Returns the name of the provider
   * @returns {string}
   */
  get providerName() {
    return availableProviders.AZURE;
  }

  /**
   * Sends a message to the queue
   * @param msg Message to send
   * @param cb Callback
   */
  sendMessage(msg, cb) {
    this.sbService.sendQueueMessage(this.queueName, msg, cb);
  }

  /**
   * Long Polls the queue for any incoming messages
   * @param cb The callback to call with the result
   */
  receiveMessage(cb) {
    const options = {isPeekLock: true};
    this.sbService.receiveQueueMessage(this.queueName, options, cb);
  }

  /**
   * Remove a message from the queue
   * @param msg The message object
   * @param cb Callback to call when it's done
   */
  deleteMessage(msg, cb) {
    this.sbService.deleteMessage(msg, cb);
  }

}

module.exports = AzureProvider;

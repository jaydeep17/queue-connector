'use strict';

/**
 * The high level queue object that abstracts all the details
 */
class Queue {

  /**
   * Takes in a provider
   * @param queueProvider Provider of the underlying queue
   */
  constructor(queueProvider) {
    this.provider = queueProvider;
  }

  /**
   * Sends a message to the queue
   * @param msg Message to send
   * @param cb Callback
   */
  sendMessage(msg, cb) {
    this.provider.sendMessage(msg, cb);
  }

}

module.exports = Queue;

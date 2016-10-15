'use strict';

const Message = require('./message');

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

  /**
   * Long Polls the queue for any incoming messages
   * @param cb The callback to call with the result
   */
  receiveMessage(cb) {
    this.provider.receiveMessage((err, data) => {
      if (err) return cb(err);
      const message = new Message(data, this.provider);
      cb(null, message);
    });
  }

}

module.exports = Queue;

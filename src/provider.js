'use strict';

/**
 * The base Provider for the queue
 * All the providers should adhere to this interface
 */
class AbstractProvider {

  /**
   * Returns the name of the provider
   * @returns {string}
   */
  get providerName() {
    throw new Error('Provider not implemented');
  }

  /**
   * Sends a message to the queue
   * @param msg Message to send
   * @param cb Callback
   */
  sendMessage(msg, cb) {
    throw new Error('Provider not implemented');
  }

  /**
   * Long Polls the queue for any incoming messages
   * @param cb The callback to call with the result
   */
  receiveMessage(cb) {
    throw new Error('Provider not implemented');
  }

  /**
   * Remove a message from the queue
   * @param msg The message object
   * @param cb Callback to call when it's done
   */
  deleteMessage(msg, cb) {
    throw new Error('Provider not implemented');
  }

}

module.exports = AbstractProvider;

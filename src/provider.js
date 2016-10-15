'use strict';

/**
 * The base Provider for the queue
 * All the providers should adhere to this interface
 */
class AbstractProvider {

  /**
   * Sends a message to the queue
   * @param msg Message to send
   * @param cb Callback
   */
  sendMessage(msg, cb) {
    throw new Error('Provider not implemented');
  }

}

module.exports = AbstractProvider;

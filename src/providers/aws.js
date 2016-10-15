'use strict';

const aws = require('aws-sdk');
const AbstractProvider = require('../provider');
const availableProviders = require('./available-providers');

/**
 * Uses AWS SQS as the underlying queue
 */
class AwsProvider extends AbstractProvider {

  /**
   * The constructor establishes the connection to the queue
   * @param connOptions The options required by AWS SDK to connect (like accessKeyId, secretAccessKey & region)
   * @param queueUrl The url of SQS queue
   * @param otherOptions Options like (MaxNumberOfMessages, WaitTimeSeconds)
   */
  constructor(connOptions, queueUrl, otherOptions = {}) {
    super();
    if (!connOptions) throw new Error('Must provide connection options');
    if (!queueUrl) throw new Error('Must provide Queue Url');

    this.sqs = new aws.SQS(connOptions);
    this.queueUrl = queueUrl;
    this.otherOptions = otherOptions;
  }

  /**
   * Returns the name of the provider
   * @returns {string}
   */
  get providerName() {
    return availableProviders.AWS;
  }

  /**
   * Sends a message to the queue
   * @param msg Message to send
   * @param cb Callback
   */
  sendMessage(msg, cb) {
    const params = {
      MessageBody: msg,
      QueueUrl: this.queueUrl,
    };
    this.sqs.sendMessage(params, cb);
  }

  /**
   * Long Polls the queue for any incoming messages
   * @param cb The callback to call with the result
   */
  receiveMessage(cb) {
    const params = {
      QueueUrl: this.queueUrl,
      MaxNumberOfMessages: this.otherOptions.MaxNumberOfMessages || 1,
      WaitTimeSeconds: this.otherOptions.WaitTimeSeconds || 10,
    };
    this.sqs.receiveMessage(params, cb);
  }

  /**
   * Remove a message from the queue
   * @param msg The message object
   * @param cb Callback to call when it's done
   */
  deleteMessage(msg, cb) {
    const params = {
      QueueUrl: this.queueUrl,
      ReceiptHandle: msg.ReceiptHandle,
    };
    this.sqs.deleteMessage(params, cb);
  }

}

module.exports = AwsProvider;

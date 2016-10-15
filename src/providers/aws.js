'use strict';

const aws = require('aws-sdk');
const AbstractProvider = require('../provider');

/**
 * Uses AWS SQS as the underlying queue
 */
class AwsProvider extends AbstractProvider {

  /**
   * The constructor establishes the connection to the queue
   * @param connOptions The options required by AWS SDK to connect (like accessKeyId, secretAccessKey & region)
   * @param queueUrl The url of SQS queue
   */
  constructor(connOptions, queueUrl) {
    super();
    if (!connOptions) throw new Error('Must provide connection options');
    if (!queueUrl) throw new Error('Must provide Queue Url');

    this.sqs = new aws.SQS(connOptions);
    this.queueUrl = queueUrl;
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

}

module.exports = AwsProvider;

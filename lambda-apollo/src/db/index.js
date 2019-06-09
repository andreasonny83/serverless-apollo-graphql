import AWS from 'aws-sdk';

export default class Database {
  async connect() {
    if (!this._connection) {
      let params = {};

      if (__DEV__) {
        params = {
          endpoint: process.env.DB_URL,
          region: 'local',
          accessKeyId: 'local',
          secretAccessKey: 'local',
        };
      } else {
        params = {
          region: 'eu-central-1',
          apiVersion: '2012-08-10',
        };
      }

      AWS.config.update(params);
      this._dynamodb = new AWS.DynamoDB(params);
      this._connection = new AWS.DynamoDB.DocumentClient();

      if (__DEV__) {
        // will create tables through lambda only in development
        await this.createTables();
      }
    }

    return this._connection;
  }

  async putItem(params) {
    return new Promise((resolve, reject) => {
      this._connection.put(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async getItem(params) {
    return new Promise((resolve, reject) => {
      this._connection.get(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async updateItem(params) {
    return new Promise((resolve, reject) => {
      this._connection.update(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async scan(params = {}) {
    return new Promise((resolve, reject) => {
      this._connection.scan(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async deleteItem(params) {
    return new Promise((resolve, reject) => {
      this._connection.deleteItem(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async createTables() {
    const usersTable = {
      TableName: 'users',
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH',
        },
      ],
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    };

    await new Promise((resolve, reject) => {
      this._dynamodb.createTable(usersTable, err => {
        if (err) {
          if (err.code !== 'ResourceInUseException') {
            console.dir(err);
            reject(err);
          } else {
            console.dir(`Table "${usersTable.TableName}" exists`);
            resolve();
          }
        } else {
          console.dir(`Created table "${usersTable.TableName}"`);
          resolve();
        }
      });
    });
  }
}

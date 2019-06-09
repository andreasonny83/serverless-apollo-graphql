import Database from '../../db';

export default class DynamoDBSource {
  async getDatabase() {
    if (!this._db) {
      this._db = new Database();
      await this._db.connect();
    }

    return this._db;
  }
}

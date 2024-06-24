// models/Usuario.js
class User {
    constructor(email, password) {
      this.email = email;
      this.password = password;
    }

    static async create(user, db) {
      const usersCollection = db.collection('users');
      const result = await usersCollection.insertOne(user);
      return result.insertedId;
    }

    static async searchByEmail(email, db) {
      const usersCollection = db.collection('users');
      return await usersCollection.findOne({ email });
    }
  }

module.exports = User;
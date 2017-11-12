const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const businessSchema = mongoose.Schema({
        username: String,
        password: String,
        name: String,
        address: {
            street:String,
            city: String,
            state: String,
            zip: String
        }
});


businessSchema.statics.hashPassword= function(password) {
  return bcrypt.hash(password, 10);
};

const Business = mongoose.model('Business', businessSchema);

module.exports = {Business};
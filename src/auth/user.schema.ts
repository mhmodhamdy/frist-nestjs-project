import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 1024,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// UserSchema.methods.generateAuthToken = function() {
//   const payload = { _id: this._id, isAdmin: this.isAdmin };
//   const accessToken = this.jwtService.sign(payload);
//   return accessToken;
// };

export interface User extends mongoose.Document {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  password: string;
  isAdmin: boolean;
}

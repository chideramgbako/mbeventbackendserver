const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is reqiured"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [isEmail, "please prvide a valid email"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "minimum password length is 8"],
      //regEx( it is used to check if a string fits a pattern. lowercase , one lowercase letter ) testing the value
      validate: {
        validator: function (v) {
          const test =
            /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@.#$!%?&])[A-Za-z\d@.#$!%?&]+$/.test(
              v
            );
          return !test;
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      },
    },
    resetToken: String,
    resetTokenExpiry: Date,
  },
  { timestamps: true }
);
//haRSHING AND SALTING MAKES SURE WE DONT HAVE PASSWORD BEIGN EXPOSED
//mongoose pre save hook- protect users password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);

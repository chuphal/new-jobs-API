import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minlength: 3,
        maxlength: 50
    }, 
    email: {
        type: String,
        required: [true, "Please provide email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
            "Please provide valid email"
        ],
        unique: true
    }, 
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 4,
    }

});
//middleware
UserSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// instance
UserSchema.methods.createJWT = function () {
    return jwt.sign({userId: this._id, name: this.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

// instance
UserSchema.methods.comparePassword = async function (userPassword) {
    const isCorrect = await bcrypt.compare(userPassword, this.password);
    return isCorrect;
}

// schema to model
const User = new mongoose.model("User", UserSchema);

export { User };
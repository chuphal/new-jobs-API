import { User } from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";



const register = async (req, res, next) => {
    
    const user = await User.create({...req.body});
    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({user:{ name: user.name}, token});
        
}

const login = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password){
        throw new BadRequestError("Please enter email and password");
    }
    
    const user = await User.findOne({email});
    // console.log(user);
    if (!user){
        throw new UnauthenticatedError("Invalid Credentials");
    }
    
    // check for password
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched){
        throw new UnauthenticatedError("Invalid Password");
    }
    // check for token
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user: {name: user.name}, token});
}

export { register, login };
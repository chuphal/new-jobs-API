import { CustomAPIError } from "../errors/custom-error.js";
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    let customError = {
        // default
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong try again"
    }

    // if (err instanceof CustomAPIError) {
    //     return res.status(err.statusCode).json({msg: err.message});
    // }

    // handeling validation error
    if (err.name === 'ValidationError') {
        // console.log(Object.keys(err.errors));
        customError.msg = Object.values(err.errors)
            .map((items) => items.message)
            .join(",");

        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, Please enter another value.`
        customError.statusCode = StatusCodes.BAD_REQUEST
    }

    if (err.name === "CastError") {
        customError.msg = `No item with id ${err.value}`;
        customError.statusCode = StatusCodes.NOT_FOUND;
    }

    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err});
    return res.status(customError.statusCode).json({msg: customError.msg});
}


export { errorHandlerMiddleware };
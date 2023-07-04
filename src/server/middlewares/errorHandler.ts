import { ErrorRequestHandler, json } from "express";
import { StatusCodes } from "http-status-codes";
import { ParamsError } from "../../errors";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log("Error Handler...");
    console.log(JSON.stringify(err));

    //Handle errors
    if (err instanceof ParamsError) {
        res.status(StatusCodes.BAD_REQUEST).json({ errors: err.getErrorList() });
        return;
    }

    console.log("...Server is up...");
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
};

export { errorHandler }; 
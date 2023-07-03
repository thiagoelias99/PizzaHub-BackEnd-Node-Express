import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

const errorHandler: ErrorRequestHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("Error Handler...");
    console.log(err);

    //Handle errors

    console.log("...Server is up...");
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
};

export { errorHandler }; 
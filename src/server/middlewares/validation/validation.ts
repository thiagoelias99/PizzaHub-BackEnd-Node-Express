import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { z, ZodError } from "zod";

type TProperty = "body" | "header" | "params" | "query";

type TGetSchema = <T>(schema: z.ZodSchema<T>) => z.ZodSchema<T>;

type TAllSchemas = Record<TProperty, z.ZodSchema<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas((schema) => schema);

    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
        try {
            schema.parse(req[key as TProperty]);
        } catch (err) {
            const zodError = err as ZodError;
            const errors: Record<string, string> = {};

            zodError.errors.forEach((error) => {
                if (error.path) {
                    const fieldName = error.path.join(".");
                    errors[fieldName] = error.message;
                }
            });

            errorsResult[key] = errors;
        }
    });

    if (Object.entries(errorsResult).length === 0) {
        return next();
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
    }
};
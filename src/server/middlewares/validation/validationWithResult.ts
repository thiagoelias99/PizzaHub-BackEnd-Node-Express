import { ZodError } from "zod";
import { ParamsError } from "../../../errors";

export function validate(schema: any, data: any) {
    try {
        const result = schema.parse(data);
        return result;
    } catch (error) {
        if (error instanceof ZodError) {
            const paramsError = new ParamsError();
            error.issues.forEach(err => {
                paramsError.addToErrorList(err.path.toString(), err.message);
            });
            throw paramsError;
        }
        throw error;
    }
}

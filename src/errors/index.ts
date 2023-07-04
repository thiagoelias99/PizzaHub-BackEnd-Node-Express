export class ParamsError extends Error {
    errors: { param: string, message: string }[] = [];

    addToErrorList(param: string, message: string) {
        this.errors.push({ param, message });
    }

    getErrorList() {
        console.log(this.errors);
        return this.errors;
    }
}
import { NextFunction, Request, Response } from 'express';

const trim_string = (input: any): void => {
    if (typeof input === 'string') return; // No need to trim standalone string here

    if (input !== null && typeof input === 'object' && !Array.isArray(input)) {
        Object.keys(input).forEach((key) => {
            const value = input[key];
            if (typeof value === 'string') {
                input[key] = value.trim();
            } else if (typeof value === 'object' && value !== null) {
                trim_string(value); // recurse
            }
        });
    }
};

const trimmer = (fields: (keyof Request)[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fields.forEach((field) => {
            if (req[field]) {
                trim_string(req[field]);
            }
        });
        next();
    };
};

const trim_all = trimmer(['body', 'params', 'query']);
const trim_query = trimmer(['query']);
const trim_body = trimmer(['body']);
const trim_params = trimmer(['params']);

export { trim_all, trim_query, trim_body, trim_params };

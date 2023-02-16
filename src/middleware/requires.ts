import { NextFunction, Request, Response } from 'express';
import has from 'lodash/has';

export const requires =
  (keys: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const missing: string[] = [];
    const { body } = req;

    keys.forEach((key) => {
      if (!has(body, key)) {
        missing.push(key);
      }
    });

    if (missing.length) {
      res.status(400).json({
        msg: `The following attributes are required and missing: ${missing.join(
          ', '
        )}`,
      });
    } else {
      next();
    }
  };

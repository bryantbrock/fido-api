import { NextFunction, Request, Response } from 'express';

export const getResponse =
  (
    callback: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await callback(req, res, next);

      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ error: (e as Error).message });
    }
  };

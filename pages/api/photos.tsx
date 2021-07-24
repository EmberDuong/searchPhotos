// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import upsplashRequest from "../../utils/upsplashRequest";
import { toStringParams } from '../../utils/helper';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req
  if (req.method === 'GET') {
    console.log(toStringParams(query))
    upsplashRequest.get(`/search/photos?${toStringParams(query)}`).then((r) => {
      res.status(200).json({ data: r })
    });
  }

};

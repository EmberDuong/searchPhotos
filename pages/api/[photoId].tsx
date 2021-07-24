// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import upsplashRequest from "../../utils/upsplashRequest";
import { toStringParams } from '../../utils/helper';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req
  console.log(toStringParams(query))
  if (req.method === 'GET') {
    upsplashRequest.get(`/search/photos?${toStringParams(query)}`).then((r) => {
      res.status(200).json({ data: r })
    });
  }

};

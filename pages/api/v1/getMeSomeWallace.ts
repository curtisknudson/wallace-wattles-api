// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

const GetWallace = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new MongoClient(process.env.MONGODB_URI as string);
  const database = client.db("wallace-wattles").collection("quotes");

  const wallaceQuoteArray = (await database.find().toArray()).map((quote) => {
    return quote.quote;
  });

  const randomNumber = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  res.status(200).json({
    quote: wallaceQuoteArray[randomNumber(0, wallaceQuoteArray.length)],
  });
};

export default GetWallace;

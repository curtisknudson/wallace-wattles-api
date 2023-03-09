// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

interface Quote {
  quote: string;
  name: string;
}

const isSimilarToAnyString = (str: string, arr: string[]): Promise<string> => {
  return new Promise((resolve, reject) => {
    const strArr: string[] = str.toLowerCase().match(/\b\w+\b/g) ?? [];
    for (let i = 0; i < arr.length; i++) {
      const item: string = arr[i];
      const itemArr: string[] = item.toLowerCase().match(/\b\w+\b/g) ?? [];
      const intersection: string[] = strArr.filter((x) => itemArr.includes(x));
      const union: string[] = [...new Set(strArr.concat(itemArr))];
      const coefficient: number = (2 * intersection.length) / union.length;
      if (coefficient >= 0.8) {
        reject(`The quote "${str}" is too similar to "${item}"`);
      }
    }
    resolve(str);
  });
};

const SetWallace = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new MongoClient(process.env.MONGODB_URI as string);
  const database = client.db("wallace-wattles").collection("quotes");
  const { name, quote }: Quote = JSON.parse(req.body);

  const names = ["marion", "stephen", "nora", "dayne", "curtis", "jenna"];

  if (names.includes(name)) {
    const listOfQuotes: Quote["quote"][] = (
      await database.find().toArray()
    ).map((quote) => {
      return quote.quote;
    });
    await isSimilarToAnyString(quote, listOfQuotes)
      .then(async (quote) => {
        await database.insertOne({
          quote,
          name,
        });
        res.status(200).json({
          quote,
        });
      })
      .catch((err) => {
        res.status(409).json({
          message: err,
        });
      });

    return;
  }
  res.status(401).json({
    message: "You do not have permission to do that",
  });
};

export default SetWallace;

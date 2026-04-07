"use server";


import getCollection, { ALIAS_COLLECTION } from "@/db";
import {NewAliasProps} from "@/types";


export default async function createNewAlias(url: string, alias: string):Promise<NewAliasProps> {
  const p = {
    url: url,
    alias: alias
  }

  const aliasCollection = await getCollection(ALIAS_COLLECTION);
  const aliasRecord = await aliasCollection.findOne({ alias: alias });
  if (aliasRecord === null) {
    const res = await aliasCollection.insertOne(p);
    if (!res.acknowledged) {
      return {
        "successfulSubmission" : false,
        "message" : "Submission error occured..."
      };
    } else {
      return {
        "successfulSubmission" : true,
        "message" : "Alias has been submitted"
      };
    }
  } else {
    return {
      "successfulSubmission" : false,
      "message" : "This alias already exists..."
    };
  }
}

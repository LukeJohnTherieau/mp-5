"use server";


import getCollection, {ALIAS_COLLECTION} from "@/db";


export default async function createNewAlias(url:string, alias:string,){
  const p ={
    url: url,
    alias: alias
  }

  const aliasCollection = await getCollection(ALIAS_COLLECTION);
  const aliasRecord = await aliasCollection.findOne({alias:alias});
  if(aliasRecord === null){
    const res = await aliasCollection.insertOne(p);

    if(!res.acknowledged){
      return null;
    }
  }
}

import {AliasProps} from "@/types";
import getCollection, {ALIAS_COLLECTION} from "@/db";

export default async function getUrlByAlias(alias:string):Promise<AliasProps>{
    const aliasCollection = await getCollection(ALIAS_COLLECTION);
    const aliasRecord = await aliasCollection.findOne({alias:alias});

    if(aliasRecord === null){
        return {
            alias: "home",
            url: `/?error='${alias}' not found...`,
        };
    }

    return {
        alias: aliasRecord.alias,
        url: aliasRecord.url,
    };
}
export default async function sendUrlToClipboard(domainUrl:string, alias:string){
    navigator.clipboard.writeText(`${domainUrl}/${alias}`);
    return 
}
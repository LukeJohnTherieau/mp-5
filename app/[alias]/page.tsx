import { redirect } from 'next/navigation'
import getUrlByAlias from '@/lib/getUrlByAlias'


export default async function Page({params,}: {params: Promise<{ alias: string }>}) {
  const { alias } = await params;
  console.log(alias)
  const aliasResult = await getUrlByAlias(alias);
  redirect(aliasResult.url);
}
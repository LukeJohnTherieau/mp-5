import { redirect } from 'next/navigation'
import getUrlByAlias from '@/lib/getUrlByAlias'


export default async function Page({params}: {params: Promise<{alias: string[]}>}) {
  const { alias } = await params;
  const aliasResult = await getUrlByAlias(alias.join("/"));
  redirect(aliasResult.url);
}
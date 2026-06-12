import Header from './Header';
import { getNavData } from '@/lib/serverData';

export default async function HeaderWrapper() {
  const navData = await getNavData();
  return <Header navData={navData} />;
}

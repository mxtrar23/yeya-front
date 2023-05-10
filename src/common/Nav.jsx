import { useRouter } from 'next/router';
import constants from '@services/constants';

export default function Nav() {
  const router = useRouter();
  const route = router.pathname.substring(1);
  const title = constants.pageTitles[route] ?? 'Sistema Registro';

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 capitalize">{title}</h1>
      </div>
    </nav>
  );
}

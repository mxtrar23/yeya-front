import Header from '@components/Header';
import Nav from '@common/Nav';

export default function MainLayout({ children, name }) {
  return (
    <>
      <div className="min-h-full">
        {name != 'Home' && name != 'Login' ? <Header /> : null}
        <Nav />
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:py-6 lg:px-8">{children}</div>
        </main>
        <footer className="bg-gray-800 text-center lg:text-left">
          <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
            © 2023 Copyright :&nbsp;
            <a className="text-neutral-800 dark:text-neutral-400" target={'_blank'} href="https://haper.dev/" rel="noreferrer">
              haper.dev
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

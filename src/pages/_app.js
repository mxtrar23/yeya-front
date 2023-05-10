import '@styles/tailwind.css';
import { ProviderAuth } from '@hooks/useAuth';
import MainLayout from '@layout/MainLayout';

function MyApp({ Component, pageProps }) {
  return (
    <ProviderAuth>
      <MainLayout name={Component.name}>
        <Component {...pageProps} />
      </MainLayout>
    </ProviderAuth>
  );
}

export default MyApp;

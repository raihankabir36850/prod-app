import { Page, Layout } from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';
import { useTranslation, Trans } from 'react-i18next';
import { ProductsCard, ProductCard, ProductsList } from '../components';

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <Page>
      <TitleBar title={t('HomePage.title')} primaryAction={null} />
      <Layout>
        <Layout.Section>
          <ProductsCard />
        </Layout.Section>
        <Layout.Section>
          <ProductsList />
        </Layout.Section>
      </Layout>
    </Page>
  );
}

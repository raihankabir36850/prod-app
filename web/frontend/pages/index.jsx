import { Card, Page, Layout, TextContainer, Image, Stack, Link, Text } from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';
import { useTranslation, Trans } from 'react-i18next';

import { trophyImage } from '../assets';

import { ProductsCard, ProductCard } from '../components';

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
          <ProductCard />
        </Layout.Section>
      </Layout>
    </Page>
  );
}

import { useState } from 'react';
import { CalloutCard } from '@shopify/polaris';
import { Toast, useNavigate } from '@shopify/app-bridge-react';
import { useTranslation } from 'react-i18next';
import { useAppQuery, useAuthenticatedFetch } from '../hooks';

export function ProductsCard() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(false);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();
  const { t } = useTranslation();
  const productsCount = 5;

  const navigate = useNavigate();

  const {
    data,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: '/api/products/count',
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  const toastMarkup = toastProps.content && !isRefetchingCount && <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />;

  const handlePopulate = async () => {
    setIsLoading(true);
    const response = await fetch('/api/products/create');

    if (response.ok) {
      await refetchProductCount();
      setToastProps({
        content: t('ProductsCard.productsCreatedToast', {
          count: productsCount,
        }),
      });
    } else {
      setIsLoading(false);
      setToastProps({
        content: t('ProductsCard.errorCreatingProductsToast'),
        error: true,
      });
    }
  };

  return (
    <>
      <CalloutCard
        title='Product Creation Card'
        primaryAction={{
          content: t('ProductsCard.populateProductsButton', {
            count: productsCount,
          }),
          onAction: handlePopulate,
          loading: isLoading,
        }}
        secondaryAction={{
          content: 'View Products',
          onAction: () => {
            navigate(
              {
                name: 'Product',
              },
              { target: 'new' }
            );
          },
        }}
      ></CalloutCard>
    </>
  );
}

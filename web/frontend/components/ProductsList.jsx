import React from 'react';
import { Spinner, Layout, LegacyCard, EmptyState } from '@shopify/polaris';
import { useAppQuery } from '../hooks';

import { ProductCard } from './ProductCard';

export function ProductsList() {
  const { data, isLoading } = useAppQuery({ url: '/api/products' });

  if (isLoading) {
    return (
      <div className='spinner'>
        <Spinner size='large' />
      </div>
    );
  }

  if (data) {
    console.log(data);

    const modifiedData = data.body.data.products.edges.map((product) => {
      return {
        id: product.node.id,
        title: product.node.title,
        producType: product.node.productType,
        description: product.node.description,
        image: {
          src: product.node.images.edges[0] ? product.node.images.edges[0].node.src : '',
          alt: product.node.images.edges[0] ? product.node.images.edges[0].node.alt : '',
        },
        variants: product.node.variants.edges.map((variant) => variant.node),
        handle: product.node.handle,
      };
    });

    return (
      <div className='product-list'>
        {modifiedData && modifiedData.length ? (
          modifiedData.map((product) => <ProductCard {...product} key={product.id} />)
        ) : (
          <LegacyCard>
            <EmptyState
              heading='No Products Found'
              action={{ content: 'Add transfer' }}
              secondaryAction={{
                content: 'Learn more',
                url: 'https://help.shopify.com',
              }}
              image='https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png'
            >
              <p>Add Products usng the card above</p>
            </EmptyState>
          </LegacyCard>
        )}
      </div>
    );
  }
}

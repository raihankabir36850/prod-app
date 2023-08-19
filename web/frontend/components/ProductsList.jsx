import React from 'react';
import { Spinner } from '@shopify/polaris';
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
        handle: product.node.handle,
      };
    });
    return <div className='product-list'>{modifiedData.length ? modifiedData.map((product) => <ProductCard {...product} key={product.id} />) : null}</div>;
  }
}

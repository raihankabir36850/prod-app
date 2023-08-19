import { CalloutCard, Grid, TextField, Thumbnail, Page, MediaCard } from '@shopify/polaris';
import React from 'react';
import './ProductCard.scss';

export function ProductCard(props) {
  const { title, description, image, handle } = props;
  const URL = `https://codeordie.myshopify.com/products/${handle}`;
  console.log(props);
  return (
    <div className='productCard'>
      <Page>
        <CalloutCard
          title={handle}
          primaryAction={{
            content: 'View Product',
            onAction: () => {
              console.log('view product');
            },
            url: URL,
            target: '_self',
          }}
          secondaryAction={{
            content: 'Update Product',
            onAction: () => {
              console.log('update product');
            },
          }}
          illustration=''
        >
          <div className='product-field'>
            <img src={image ? image.src : '../assets/home-trophy.png'} alt={image.alt ? image.alt : 'default'} width='200' height='200' />
            <TextField label='Product Title' autoComplete='off' value={title} />
            <TextField label='Product Description' multiline={4} autoComplete='off' value={description} />
          </div>
        </CalloutCard>
      </Page>
    </div>
  );
}

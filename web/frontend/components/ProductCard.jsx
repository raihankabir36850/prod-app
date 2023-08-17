import { CalloutCard, Grid, LegacyStack, TextField, Badge, Thumbnail } from '@shopify/polaris';
import React from 'react';
import './ProductCard.css';

export function ProductCard() {
  return (
    <>
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <CalloutCard
            title='Individual Product Card Title'
            primaryAction={{
              content: 'View Product',
              onAction: () => {
                console.log('view product');
              },
            }}
            secondaryAction={{
              content: 'Update Product',
              onAction: () => {
                console.log('update product');
              },
            }}
          >
            <div>
              <Thumbnail source='../assets/home-trophy.png' alt='Black choker necklace' />
              <TextField label='Product Title' autoComplete='off' />
              <TextField label='Product description' multiline={4} autoComplete='off' />
            </div>
          </CalloutCard>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <CalloutCard
            title='Individual Product Card Title'
            primaryAction={{
              content: 'View Product',
              onAction: () => {
                console.log('view product');
              },
            }}
            secondaryAction={{
              content: 'Update Product',
              onAction: () => {
                console.log('update product');
              },
            }}
          >
            <div>
              <Thumbnail source='../assets/home-trophy.png' alt='Black choker necklace' />
              <TextField label='Product Title' autoComplete='off' />
              <TextField label='Product description' multiline={4} autoComplete='off' />
            </div>
          </CalloutCard>
        </Grid.Cell>
      </Grid>
    </>
  );
}

import { CalloutCard, TextField, Page, FormLayout, Collapsible } from '@shopify/polaris';
import React, { useState } from 'react';
import { Variants } from './Variants';
import './ProductCard.scss';

export function ProductCard(props) {
  const [open, setOpen] = useState(false);
  const { title, description, image, handle, variants } = props;
  const [titleValue, setTitleValue] = useState(title);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [variantsValue, setVariantsValue] = useState(variants);
  const URL = `https://codeordie.myshopify.com/products/${handle}`;

  const updateVariants = (id, price) => {
    console.log('change', id, price);

    setVariantsValue((prev) => {
      const updatedVariant = prev.map((variant) => {
        if (id === variant.id) {
          return { ...variant, price };
        }

        return variant;
      });
      return updatedVariant;
    });
  };

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
            <FormLayout>
              <TextField label='Product Title' autoComplete='off' value={titleValue} onChange={setTitleValue} />
              <TextField label='Product Description' multiline={4} autoComplete='off' value={descriptionValue} onChange={setDescriptionValue} />
              <button onClick={() => setOpen((prev) => !prev)}>Show Variants</button>
              <Collapsible transition={{ duration: '500ms', timingFunction: 'ease-in-out' }} open={open}>
                <Variants variants={variantsValue} updateVariants={updateVariants} />
              </Collapsible>
            </FormLayout>
          </div>
        </CalloutCard>
      </Page>
    </div>
  );
}

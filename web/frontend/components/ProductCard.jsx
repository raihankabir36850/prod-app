import { CalloutCard, TextField, Page, FormLayout, Collapsible } from '@shopify/polaris';
import React, { useState } from 'react';
import { useNavigate } from '@shopify/app-bridge-react';
import { Variants } from './Variants';
import { useAppQuery, useAuthenticatedFetch } from '../hooks';
import './ProductCard.scss';

export function ProductCard(props) {
  const [open, setOpen] = useState(false);
  const { id, legacyId, title, description, image, handle, variants } = props;
  const [titleValue, setTitleValue] = useState(title);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [variantsValue, setVariantsValue] = useState(variants);
  const [isUpdating, setIsUpdating] = useState(false);
  const URL = `https://codeordie.myshopify.com/products/${handle}`;
  const navigate = useNavigate();

  const fetch = useAuthenticatedFetch();

  const onUpdate = async () => {
    setIsUpdating(true);
    const updateProduct = {
      id,
      titleValue,
      descriptionValue,
      variantsValue,
    };
    const response = await fetch('/api/products/update', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateProduct),
    });

    if (response.ok) {
      setIsUpdating(false);
      alert('Product updated successfully');
    }
  };

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
            onAction: () => navigate({ name: 'Product', resource: { id: legacyId } }, { target: 'new' }),
          }}
          secondaryAction={{
            content: isUpdating ? 'Updating....' : 'Update Product',
            onAction: onUpdate,
          }}
          illustration=''
        >
          <div className='product-field'>
            <img src={image ? image.src : '../assets/home-trophy.png'} alt={image.alt ? image.alt : 'default'} width='200' height='200' />
            <FormLayout>
              <TextField label='Product Title' autoComplete='off' value={titleValue} onChange={setTitleValue} disabled={isUpdating} />
              <TextField label='Product Description' multiline={4} autoComplete='off' value={descriptionValue} disabled={isUpdating} onChange={setDescriptionValue} />
              <button onClick={() => setOpen((prev) => !prev)}>Show Variants</button>
              <Collapsible transition={{ duration: '500ms', timingFunction: 'ease-in-out' }} open={open}>
                <Variants variants={variantsValue} updateVariants={updateVariants} isUpdating={isUpdating} />
              </Collapsible>
            </FormLayout>
          </div>
        </CalloutCard>
      </Page>
    </div>
  );
}

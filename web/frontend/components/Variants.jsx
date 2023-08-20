import React, { useState } from 'react';
import { IndexTable, LegacyCard, TextField } from '@shopify/polaris';
import { Variant } from './Variant';

export function Variants({ variants, updateVariants }) {
  console.log(variants, 'variants');
  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const variantMarkup = variants.map((variant, index) => <Variant {...variant} key={index} updateVariants={updateVariants} />);
  console.log(variantMarkup, 'variantMarkup');
  return (
    <LegacyCard>
      <IndexTable itemCount={variants.length} headings={[{ title: 'Tile' }, { title: 'Price' }]} selectable={false}>
        {variantMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

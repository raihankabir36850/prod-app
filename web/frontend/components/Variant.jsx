import React, { useState } from 'react';
import { IndexTable, LegacyCard, TextField } from '@shopify/polaris';

export function Variant(props) {
  console.log(props, 'props');
  const { id, title, price, updateVariants, isUpdating } = props;
  return (
    <IndexTable.Row id={title} key={id}>
      <IndexTable.Cell>{title}</IndexTable.Cell>
      <IndexTable.Cell>
        <TextField type='number' value={price} prefix='$' autoComplete='off' onChange={(price) => updateVariants(id, price)} disabled={isUpdating} />
      </IndexTable.Cell>
    </IndexTable.Row>
  );
}

import { GraphqlQueryError } from '@shopify/shopify-api';
import shopify from './shopify.js';

const UPDATE_PRODUCT_MUTATION = `
  mutation ($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        id
        title
        descriptionHtml
        variants(first: 10) {
            edges {
                node {
                    id
                    price
                }
            }
         }

      }
    }
  }
`;

export default async function productUpate(session, { id, titleValue, descriptionValue, variantsValue }) {
  const client = new shopify.api.clients.Graphql({ session });

  try {
    await client.query({
      data: {
        query: UPDATE_PRODUCT_MUTATION,
        variables: {
          input: {
            id,
            title: titleValue,
            descriptionHtml: descriptionValue,
            variants: variantsValue,
          },
        },
      },
    });
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(`${error.message}\n${JSON.stringify(error.response, null, 2)}`);
    } else {
      throw error;
    }
  }
}

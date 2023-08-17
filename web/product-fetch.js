import shopify from './shopify.js';

const FETCH_10_PRODUCTS = `
    {
      products(reverse: true, first: 10) {
        edges {
            node {
                id
                title
                productType
                totalInventory
                status
                tags
                storefrontId
                templateSuffix
                totalVariants
                tracksInventory
                }
            }
       }
    }
`;

export default async function productFetch(session) {
  const client = new shopify.api.clients.Graphql({ session });
  let data;
  try {
    data = await client.query({
      data: {
        query: FETCH_10_PRODUCTS,
      },
    });
  } catch (error) {
    console.log(error);
  }

  if (data) {
    return data;
  }
}

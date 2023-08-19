import shopify from './shopify.js';

const FETCH_10_PRODUCTS = `
    {
      products(first: 10 reverse: true) {
        edges {
          node {
            id
            title
            description
            productType
            handle
            images(first: 10) {
              edges {
                node {
                  src
                  url
                  altText
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
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

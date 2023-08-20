import shopify from './shopify.js';

const FETCH_10_PRODUCTS = `
    {
      products(first: 10) {
        edges {
          node {
            id
            legacyResourceId
            title
            descriptionHtml
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

            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price
                  image {
                    src
                  }
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

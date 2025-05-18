'use server';

import { ClientError, GraphQLClient, Variables } from 'graphql-request';

let grapQLClient: GraphQLClient;
const getClient = async () => {
  if (grapQLClient) {
    return grapQLClient;
  }

  grapQLClient = new GraphQLClient(process.env['GRAPQL_ENDPOINT'] ?? '');
  return grapQLClient;
};

export async function graphqlRequest<TRes>(
  query: string,
  variable?: Variables
) {
  try {
    const client = await getClient();
    const response = await client.request<TRes>(query, {
      ...variable,
    });

    return {
      ok: true,
      data: response,
      error: null,
    };
  } catch (e: unknown) {
    let err;
    if (e instanceof ClientError && e.response) {
      const responseErr = e.response.errors;
      if (responseErr && responseErr[0].message) {
        err = responseErr[0].message;
      } else {
        err = e.message;
      }
    }
    console.error(e, { depth: Infinity });

    return {
      ok: false,
      data: null,
      error: err,
    };
  }
}

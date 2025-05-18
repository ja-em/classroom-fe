import { graphqlRequest } from '@/libs/graphql-request';
import { PrefixObject } from '@classroom-management/shared-type';
import { gql } from 'graphql-request';

const ALL_PREFIX_QUERY = gql`
  query GetAllPrefix {
    getAllPrefix {
      prefixid
      prefixname
    }
  }
`;

export const getAllPrefixAction = async (): Promise<PrefixObject[]> => {
  const res = await graphqlRequest<{
    getAllPrefix: PrefixObject[];
  }>(ALL_PREFIX_QUERY);
  if (res.ok && res.data) {
    return res?.data?.getAllPrefix ?? [];
  } else {
    return [];
  }
};

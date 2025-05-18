import { graphqlRequest } from '@/libs/graphql-request';
import { GradeLevelObject } from '@classroom-management/shared-type';
import { gql } from 'graphql-request';

const ALL_GRADE_LEVEL_QUERY = gql`
  query GetAllGradeLevel {
    getAllGradeLevel {
      gradelevelid
      levelname
    }
  }
`;

export const getAllGradeLevelAction = async (): Promise<GradeLevelObject[]> => {
  const res = await graphqlRequest<{
    getAllGradeLevel: GradeLevelObject[];
  }>(ALL_GRADE_LEVEL_QUERY);
  if (res.ok && res.data) {
    return res?.data?.getAllGradeLevel ?? [];
  } else {
    return [];
  }
};

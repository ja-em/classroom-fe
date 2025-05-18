import { graphqlRequest } from "@/libs/graphql-request";
import { GenderObject } from "@/types/object";
import { gql } from "graphql-request";

const ALL_GENDER_QUERY = gql`
  query GetAllGender {
    getAllGender {
      genderid
      gendername
    }
  }
`;

export const getAllGenderAction = async (): Promise<GenderObject[]> => {
  const res = await graphqlRequest<{
    getAllGender: GenderObject[];
  }>(ALL_GENDER_QUERY);
  if (res.ok && res.data) {
    return res?.data?.getAllGender ?? [];
  } else {
    return [];
  }
};

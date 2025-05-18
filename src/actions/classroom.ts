"use server";
import { graphqlRequest } from "@/libs/graphql-request";
import { GetAllClassroomInput } from "@/types/input";
import { ClassroomPaginationObject } from "@/types/object";
import { gql } from "graphql-request";

const GET_ALL_CLASSROOM_QUERY = gql`
  query GetAllClassroom($input: GetAllClassroomInput) {
    getAllClassroom(input: $input) {
      items {
        classroomid
        classname
        academic_year
        homeroom_teacher
      }
      totalItem
      totalPage
      page
      limit
      hasNextPage
      hasPreviousPage
    }
  }
`;

export const getAllClassroomAction = async (input?: GetAllClassroomInput) => {
  const res = await graphqlRequest<{
    getAllClassroom: ClassroomPaginationObject;
  }>(GET_ALL_CLASSROOM_QUERY, {
    input,
  });
  if (!res.ok) {
    const mock: ClassroomPaginationObject = {
      items: [],
      totalItem: 0,
      totalPage: 0,
      page: 0,
      limit: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    };
    return mock;
  }
  return res.data?.getAllClassroom;
};

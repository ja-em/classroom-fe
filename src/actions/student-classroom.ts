"use server";

import { graphqlRequest } from "@/libs/graphql-request";
import { StudentClassroomPaginationObject } from "@/types/object";
import { gql } from "graphql-request";

const GET_STUDENT_CLASSROOM_QUERY = gql`
  query GetStudentClassroomByClassroomId($classroomId: Int!) {
    getStudentClassroomByClassroomId(classroomId: $classroomId) {
      items {
        student_classroom_id
        studentid
        classroomid
        student {
          studentid
          prefixid
          firstname
          lastname
          genderid
          birthdate
          gradelevelid
          prefix {
            prefixid
            prefixname
          }
          gender {
            genderid
            gendername
          }
          gradelevel {
            gradelevelid
            levelname
          }
        }
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

export const getStudentClassroomByClassroomIdAction = async (
  classroomId: number
) => {
  const res = await graphqlRequest<{
    getStudentClassroomByClassroomId: StudentClassroomPaginationObject;
  }>(GET_STUDENT_CLASSROOM_QUERY, {
    classroomId,
  });
  return res;
};

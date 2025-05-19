"use server";

import { graphqlRequest } from "@/libs/graphql-request";
import { CreateStudentClassroomInput } from "@/types/input";
import { MenuLink } from "@/types/menu";
import {
  StudentClassroomObject,
  StudentClassroomPaginationObject,
} from "@/types/object";
import { gql } from "graphql-request";
import { revalidatePath } from "next/cache";

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

const CREATE_STUDENT_CLASSROOM_MUTATION = gql`
  mutation CreateStudentClassroom($input: CreateStudentClassroomInput!) {
    createStudentClassroom(input: $input) {
      student_classroom_id
    }
  }
`;

export const createStudentClassroomAction = async (
  input: CreateStudentClassroomInput
) => {
  const res = await graphqlRequest<{
    createStudentClassroom: Pick<
      StudentClassroomObject,
      "student_classroom_id"
    >;
  }>(CREATE_STUDENT_CLASSROOM_MUTATION, {
    input,
  });
  if (res.ok) {
    revalidatePath(
      `${MenuLink.Classroom}${input.classroomId}/student-classroom`
    );
    revalidatePath(
      `${MenuLink.Classroom}${input.classroomId}/student-classroom/add`
    );
  }
  return res;
};

const REMOVE_STUDENT_CLASSROOM_MUTATION = gql`
  mutation RemoveStudentClassroom($id: Int!) {
    removeStudentClassroom(studentClassroomId: $id) {
      student_classroom_id
    }
  }
`;

export const removeStudentClassroomAction = async (
  studentClassroomId: number,
  classroomId: number
) => {
  const res = await graphqlRequest<{
    removeStudentClassroom: Pick<
      StudentClassroomObject,
      "student_classroom_id"
    >;
  }>(REMOVE_STUDENT_CLASSROOM_MUTATION, {
    id: studentClassroomId,
  });
  if (res.ok) {
    revalidatePath(`${MenuLink.Classroom}${classroomId}/student-classroom`);
  }
  return res;
};

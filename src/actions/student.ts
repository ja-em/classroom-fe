"use server";

import { graphqlRequest } from "@/libs/graphql-request";
import {
  CreateStudentInput,
  GetAllStudentInput,
  UpdateStudentInput,
} from "@/types/input";
import { MenuLink } from "@/types/menu";
import { StudentObject, StudentPaginationObject } from "@/types/object";

import { gql } from "graphql-request";
import { revalidatePath } from "next/cache";

const ALL_STUDENT_QUERY = gql`
  query GetStudents($input: GetAllStudentInput) {
    getStudents(input: $input) {
      totalItem
      totalPage
      page
      limit
      hasNextPage
      hasPreviousPage
      items {
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
        student_classroom {
          studentid
          classroomid
          student_classroom_id
        }
      }
    }
  }
`;

export const getAllStudentAction = async (
  variables: GetAllStudentInput
): Promise<StudentPaginationObject> => {
  const res = await graphqlRequest<{
    getStudents: StudentPaginationObject;
  }>(ALL_STUDENT_QUERY, {
    input: variables,
  });

  if (!res.ok || !res.data) {
    const mock: StudentPaginationObject = {
      items: [] as StudentObject[],
      totalItem: 0,
      totalPage: 0,
      page: 0,
      limit: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    };
    return mock;
  }
  return res.data.getStudents;
};

const CREATE_STUDENT_MUTATION = gql`
  mutation CreateStudent($input: CreateStudentInput!) {
    createStudent(createStudentInput: $input) {
      studentid
    }
  }
`;

export const createStudentAction = async (input: CreateStudentInput) => {
  const res = await graphqlRequest<{ createStudent: { studentid: number } }>(
    CREATE_STUDENT_MUTATION,
    { input }
  );
  if (res.ok) {
    revalidatePath(MenuLink.Student);
  }
  return res;
};

const DELETE_STUDENT_MUTATION = gql`
  mutation RemoveStudent($studentId: Int!) {
    removeStudent(id: $studentId) {
      studentid
    }
  }
`;

export const deleteStudentAction = async (studentId: number) => {
  const res = await graphqlRequest<{ removeStudent: { studentid: number } }>(
    DELETE_STUDENT_MUTATION,
    { studentId }
  );
  if (res.ok) {
    revalidatePath(MenuLink.Student);
  }
  return res;
};

const GET_STUDENT_BY_ID_QUERY = gql`
  query GetStudentById($studentId: Int!) {
    getStudentById(id: $studentId) {
      studentid
      prefixid
      firstname
      lastname
      genderid
      birthdate
      gradelevelid
    }
  }
`;

export const getStudentByIdAction = async (studentId: number) => {
  const res = await graphqlRequest<{ getStudentById: StudentObject }>(
    GET_STUDENT_BY_ID_QUERY,
    { studentId }
  );

  return res.data?.getStudentById;
};

const UPDTAE_STUDENT_MUTATION = gql`
  mutation UpdateStudent($input: UpdateStudentInput!) {
    updateStudent(updateStudentInput: $input) {
      studentid
    }
  }
`;

export const updateStudentAction = async (input: UpdateStudentInput) => {
  const res = await graphqlRequest<{ updateStudent: { studentid: number } }>(
    UPDTAE_STUDENT_MUTATION,
    { input }
  );
  if (res.ok) {
    revalidatePath(MenuLink.Student);
  }
  return res;
};

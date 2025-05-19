"use server";
import { graphqlRequest } from "@/libs/graphql-request";
import {
  CreateClassroomInput,
  GetAllClassroomInput,
  UpdateClassroomInput,
} from "@/types/input";
import { MenuLink } from "@/types/menu";
import { ClassroomObject, ClassroomPaginationObject } from "@/types/object";
import { gql } from "graphql-request";
import { revalidatePath } from "next/cache";

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

const CREAT_CLASSROOM_MUTATION = gql`
  mutation CreateClassroom($input: CreateClassroomInput!) {
    createClassroom(input: $input) {
      classroomid
      classname
      academic_year
      homeroom_teacher
    }
  }
`;

export const createClassroomAction = async (input: CreateClassroomInput) => {
  const res = await graphqlRequest<{
    createClassroom: ClassroomObject;
  }>(CREAT_CLASSROOM_MUTATION, {
    input,
  });
  if (res.ok) {
    revalidatePath(MenuLink.Classroom);
  }
  return res;
};

const UPDATE_CLASSROOM_MUTATION = gql`
  mutation UpdateClassroom($input: UpdateClassroomInput!) {
    updateClassroom(input: $input) {
      classroomid
      classname
      academic_year
      homeroom_teacher
    }
  }
`;

export const updateClassroomAction = async (input: UpdateClassroomInput) => {
  const res = await graphqlRequest<{
    updateClassroom: ClassroomObject;
  }>(UPDATE_CLASSROOM_MUTATION, {
    input,
  });
  if (res.ok) {
    revalidatePath(MenuLink.Classroom);
  }
  return res;
};

const REMOVE_CLASSROOM_MUTATION = gql`
  mutation RemoveClassroom($classroomid: Int!) {
    removeClassroom(id: $classroomid) {
      classroomid
      classname
      academic_year
      homeroom_teacher
    }
  }
`;

export const removeClassroomAction = async (classroomid: number) => {
  const res = await graphqlRequest<{
    removeClassroom: ClassroomObject;
  }>(REMOVE_CLASSROOM_MUTATION, {
    classroomid,
  });
  if (res.ok) {
    revalidatePath(MenuLink.Classroom);
  }
  return res;
};

const GET_CLASSROOM_QUERY = gql`
  query GetClassroomById($classroomid: Int!) {
    getClassroomById(id: $classroomid) {
      classroomid
      classname
      academic_year
      homeroom_teacher
    }
  }
`;

export const getClassroomByIdAction = async (classroomid: number) => {
  const res = await graphqlRequest<{
    getClassroomById: ClassroomObject;
  }>(GET_CLASSROOM_QUERY, {
    classroomid,
  });

  return res;
};

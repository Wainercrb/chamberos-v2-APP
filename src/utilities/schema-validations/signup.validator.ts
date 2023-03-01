import * as Yup from "yup";
import { CONSTANTS } from "../../../CONSTANTS";
import { IUser } from "../../../types";

export const SIGN_UP_VALIDATION_SCHEMA: Yup.Schema<IUser> = Yup.object().shape({
  fullName: Yup
    .string()
    .required(CONSTANTS.YUP.USER.FULL_NAME.REQUIRED),
  email: Yup.string()
    .email(CONSTANTS.YUP.USER.EMAIL.FORMAT)
    .required(CONSTANTS.YUP.USER.EMAIL.REQUIRED),
  password: Yup
    .string()
    .required(CONSTANTS.YUP.USER.PASSWORD.REQUIRED),
  username: Yup
    .string()
    .required(CONSTANTS.YUP.USER.USERNAME.REQUIRED),
  isActive: Yup
    .boolean()
    .required(CONSTANTS.YUP.USER.USERNAME.REQUIRED),  
  professions: Yup
    .array()
    .required()
    .min(1, CONSTANTS.YUP.USER.PROFESSIONS.MIN_1)
    .of(
      Yup.object().shape({
        name: Yup
          .string()
          .required(CONSTANTS.YUP.ROLES.NAME.REQUIRED),
        // type: Yup.string()
        //   .oneOf(["FULLTIME", "TEMPORAL"], CONSTANTS.YUP.ROLES.NAME.REQUIRED)
        //   .required(CONSTANTS.YUP.ROLES.NAME.REQUIRED),
      })
    ),
  roles: Yup
    .array()
    .required()
    .min(1, CONSTANTS.YUP.USER.ROLES.MIN_1)
    .of(
      Yup.object().shape({
        name: Yup
          .string()
          .required(CONSTANTS.YUP.PROFESSIONS.NAME.REQUIRED),
        description: Yup
          .string()
          .required(
            CONSTANTS.YUP.PROFESSIONS.DESCRIPTION.REQUIRED
          ),
      })
    ),
  location: Yup.object().shape({
    x: Yup
      .number()
      .required(CONSTANTS.YUP.USER.LOCATION.X),
    y: Yup
      .number()
      .required(CONSTANTS.YUP.USER.LOCATION.Y),
  }),
});

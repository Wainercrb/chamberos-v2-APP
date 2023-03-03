import * as Yup from 'yup'
import { CONSTANTS } from '../../../CONSTANTS'
import { type IUser } from '../../../types'

const SIGN_IN_USER_VALIDATION_SCHEMA: Yup.Schema<
Pick<IUser, 'username' | 'password'>
> = Yup.object().shape({
  username: Yup.string().required(CONSTANTS.YUP.USER.USERNAME.REQUIRED),
  password: Yup
    .string()
    .required(CONSTANTS.YUP.USER.PASSWORD.REQUIRED)
    .matches(CONSTANTS.PASS_REGEX, CONSTANTS.YUP.USER.PASSWORD.MATCHED)
})

export { SIGN_IN_USER_VALIDATION_SCHEMA }

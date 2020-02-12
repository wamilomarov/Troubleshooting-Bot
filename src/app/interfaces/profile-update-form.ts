import {Csr} from "./csr";

export interface ProfileUpdateForm {
  "name": string,
  "username": string,
  "email": string,
  "password": string,
  "old_password": string,
  "old_password_confirmation": string,
}

interface IAsyncData<R> {
  data: R;
  meta: Csr,
  errors?: Array<string>
}

interface IResources extends IAsyncData<boolean>{}


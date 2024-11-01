import { ILogin } from "../constant/auth.constant";
import { IFormEmail, IResponseListSendEmail } from "../constant/email.constant";
import { api } from "./api";

export const login = (data: ILogin) => {
  return api.post('login', data)
}

export const listEmailSend = () => {
  return api.get<IResponseListSendEmail>("send-email");
};

export const createEmailSend = (data:IFormEmail) => {
  return api.post('send-email', {...data, sendDate: data.date});
}

export const editEmailSend = (data:IFormEmail) => {
  data.date = new Date(data.date).toISOString();
  return api.patch(`send-email/${data.id}`,  {...data, sendDate: data.date});
}

export const deleteEmailSend = (id: number) => {
  return api.delete(`send-email/${id}`);
}
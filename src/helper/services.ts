import { IFormEmail, IResponseListSendEmail } from "../constant/email.constant";
import { api } from "./api";
export const listEmailSend = () => {
  return api.get<IResponseListSendEmail>("send-email");
};

export const createEmailSend = (data:IFormEmail) => {
  return api.post('send-email', {...data, sendDate: data.date});
}

export const editEmailSend = (data:IFormEmail) => {
  return api.put(`send-email/${data.id}`, data);
}

export const deleteEmailSend = (id: number) => {
  return api.delete(`send-email/${id}`);
}
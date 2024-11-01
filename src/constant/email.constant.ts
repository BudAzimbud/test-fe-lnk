export interface IFormEmail {
  id: number;
  email: string;
  description: string;
  date: string;
}

export interface ResponseSendEmail {
  description: string;
  email: string;
  sendDate: string;
  _id: string;
}

export interface IResponseListSendEmail {
  data: {
    data: ResponseSendEmail[];
    count: number;
  };
}

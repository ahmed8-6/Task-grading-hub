export type AuthPayload = {
  userId: string;
  isAdmin: boolean;
  iat?: number;
  exp?: number;
};

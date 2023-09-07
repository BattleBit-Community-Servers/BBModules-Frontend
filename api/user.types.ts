// Interface for user
type CookieData = {
  originalMaxAge: number;
  expires: string;
  secure: boolean;
  httpOnly: boolean;
  path: string;
};

type PassportUserData = {
  id: string;
  roles: string;
};

export type UserData = {
  cookie: CookieData;
  passport: {
    user: PassportUserData;
  };
};
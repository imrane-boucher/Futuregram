export type AuthUser = {
  app_metadata: {
    provider: string;
    providers: any[];
  };
  id: string;
  aud: string;
  confirmed_at: string;
  created_at: string;
  email?: string;
  email_confirmed_at?: string;
  identities?: any[];
  last_sign_in_at?: string;
  phone?: string;
  role: string;
  updated_at?: string;
  user_metadata?:
    | {
        avatar_url?: string;
        db_id?: string;
      }
    | any;
};

export type getTextType = {
  text: string;
  className: string;
};

export type LanguageType = {
  short_code: string;
  name: string;
};

export type SingleStringType = {
  id: number;
  key: string;
  value: string;
  description: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  group: string;
  translator: string;
};

export type SingleStringGroup = Record<string, SingleStringType[]>;

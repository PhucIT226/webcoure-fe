export type SelectOption = {
  value: string | number | readonly string[] | undefined;
  label: string;
};

export type TAny = any;

export type Image = { url: string };

export type Pagination = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

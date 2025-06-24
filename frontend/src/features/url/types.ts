export interface Url {
  _id: string;
  originalUrl: string;
  shortCode: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UrlsResponse {
  items: Url[];
  meta: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

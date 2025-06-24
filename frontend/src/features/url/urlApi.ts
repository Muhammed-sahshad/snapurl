import apiClient from "../../lib/axios";
import type { Url, UrlsResponse } from "./types";

export const createUrl = async (originalUrl: string): Promise<Url> => {
  const res = await apiClient.post("/urls", { originalUrl });
  return res.data;
};

export const getUserUrls = async (page: number, limit: number): Promise<UrlsResponse> => {
  const res = await apiClient.get("/urls", {params:{page, limit}});
  return res.data;
};

export const getUrlByShortCode = async (code: string): Promise<Url> => {
  const res = await apiClient.get(`/urls/s/${code}`);
  return res.data;
};


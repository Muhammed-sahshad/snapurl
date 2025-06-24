import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUrl, getUserUrls } from "./urlApi";
import type { Url, UrlsResponse } from "./types";
import type { AxiosError } from "axios";

export const createShortUrl = createAsyncThunk<Url, string>(
  "urls/createShortUrl",
  async (originalUrl, thunkAPI) => {
    try {
      return await createUrl(originalUrl);
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.message || "Failed to create short URL");
    }
  }
);

export const fetchUserUrls = createAsyncThunk<UrlsResponse, { page: number; limit: number }>(
  "urls/fetchUserUrls",
  async ({ page, limit }, thunkAPI) => {
    try {
      return await getUserUrls(page, limit);
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.message || "Failed to fetch URLs");
    }
  }
);

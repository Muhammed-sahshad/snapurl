import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createShortUrl, fetchUserUrls } from "./urlThunk";
import type { Url, UrlsResponse } from "./types";

interface UrlState {
  urls: Url[];
  loading: boolean;
  error: string | null;
  meta: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  } | null;
}

const initialState: UrlState = {
  urls: [],
  loading: false,
  error: null,
  meta: null,
};

const urlSlice = createSlice({
  name: "urls",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE SHORT URL
      .addCase(createShortUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShortUrl.fulfilled, (state, action: PayloadAction<Url>) => {
        state.loading = false;
        state.urls.unshift(action.payload);
        if (state.meta && state.urls.length > state.meta.pageSize) {
          state.urls.pop();
          state.meta.hasNextPage = true;
        }

        if (state.meta) {
          state.meta.totalItems += 1;
          state.meta.totalPages = Math.ceil(state.meta.totalItems / state.meta.pageSize);
        }
      })
      .addCase(createShortUrl.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH USER URLS
      .addCase(fetchUserUrls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserUrls.fulfilled, (state, action: PayloadAction<UrlsResponse>) => {
        state.loading = false;
        state.urls = action.payload.items;
        state.meta = action.payload.meta;
      })
      .addCase(fetchUserUrls.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default urlSlice.reducer;

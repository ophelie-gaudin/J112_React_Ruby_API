import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../../app/store";
// importer l'API juste en dessous
import { fetchPosts, createPost } from "./postAPI";

export enum Statuses {
  Initial = "Not Fetched",
  Loading = "Loading...",
  UpToDate = "Up To Date",
  Deleted = "Deleted",
  Error = "Error",
}

export interface PostFormData {
  post: {
    id?: string;
    title: string;
    body: string;
  };
}

export interface PostState {
  id?: number;
  title?: string;
  body?: string;
  created_at?: any;
  updated_at?: any;
}

export interface PostsState {
  posts: PostState[];
  status: string;
}

const initialState: PostsState = {
  posts: [
    {
      id: 0,
      title: "",
      body: "",
      created_at: "",
      updated_at: "",
    },
  ],
  status: Statuses.Initial,
};

export const fetchPostsAsync = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const response = await fetchPosts();
    return response;
  }
);

export const createPostAsync = createAsyncThunk(
  "posts/createPost",
  async (payload: PostFormData) => {
    const response = await createPost(payload);
    return response;
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  // Synchronous actions
  reducers: {},
  extraReducers: (builder) => {
    builder
      //* GET
      // while we wait
      .addCase(fetchPostsAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })

      // when we got the thing
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.posts = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })

      // The error
      .addCase(fetchPostsAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      })

      //* UPDATE section
      .addCase(createPostAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })

      // when we got the thing
      .addCase(createPostAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.posts.push(action.payload);
          draftState.status = Statuses.UpToDate;
        });
      })

      // The error
      .addCase(createPostAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      });
  },
});

export const {} = postSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;

export const selectStatus = (state: RootState) => state.posts.status;

export default postSlice.reducer;

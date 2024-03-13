import { IPost } from "@/models/interfaces/post-interface";
import { PostType } from "@/models/types/post-type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPostsThunk = createAsyncThunk("post/getPosts", async () => {
  const response = await axios.get(
    "https://cdn.contentful.com/spaces/uflk394shvqp/environments/master/entries?access_token=mcTJDCh6ZHRl9asibu1Sl1ri6ehT3Zs4cu5sYyivQio&content_type=post"
  );

  const data: PostType = response.data;

  const assetsDataCollections = data.includes.Asset;

  const result: IPost[] = data.items.map((item) => {

    const imageAssets = item.fields.image
      ? assetsDataCollections.filter(
          (asset) => item.fields.image?.sys.id === asset.sys.id
        )
      : undefined;

    return {
      id: item.sys.id,
      message: item.fields.message,
      image: item.fields.image && imageAssets
        ? {
            id: item.fields.image?.sys.id,
            title: imageAssets[0].fields.title,
            url: imageAssets[0].fields.file.url,
          }
        : undefined,
    };
  });

  return result;
});

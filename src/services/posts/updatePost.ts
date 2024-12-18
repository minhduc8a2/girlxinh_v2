import { dbConnect } from "@/database/connect"
import Post from "@/database/models/Post"
import { PostType } from "@/types/posts.types"
import { revalidateTag } from "next/cache"
import { GET_POST_TAG } from "./getPost"
import mongoose from "mongoose"

export async function updatePost(
  _id: string,
  { title, param, description, girl, isPrivate, user, view, body }: PostType,
  wantConnectDB: boolean = true,
  session?: mongoose.mongo.ClientSession
) {
  if (wantConnectDB) {
    await dbConnect()
  }
  const result = await Post.updateOne(
    { _id },
    {
      title,
      param,
      description,
      girl,
      isPrivate,
      user,
      view,
      body,
    },
    {
      session,
    }
  )
  revalidateTag(GET_POST_TAG)
  return result
}

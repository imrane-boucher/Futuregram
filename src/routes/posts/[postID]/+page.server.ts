import { supabase } from "$lib/supabaseClient";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({params}: any) => {
  const { data } = await supabase.from("posts").select().eq("id", params.postID)

  if(data) {
    return {
      id: data[0].id,
      title: data[0].title,
      description: data[0].description,
      likes: data[0].likes,
      image_url: data[0].image_url,
      user_id: data[0].user_id,
      created_at: data[0].created_at
    }
  }
}
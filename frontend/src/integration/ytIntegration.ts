import axios from "axios";

const YT_API_KEY = "AIzaSyCx1s5FK2K16jLqWmhGMBKE04g4ITIYx4k";

const baseUrl = "https://www.googleapis.com/youtube/v3/videos";

export async function getYTData(videoId: string) {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        id: videoId,
        part: "snippet",
        key: YT_API_KEY,
      },
    });

    console.log(response.data.items[0]);

    // return response.data.items[0];

    return;
  } catch (error) {
    console.log(error);
  }
}

import axios from "axios";

const baseUrl = "https://www.googleapis.com/youtube/v3/videos";

export async function getYTData(link: string) {
  try {
    const urlObj = new URL(link);

    const response = await axios.get(process.env.YT_BASE_URL || baseUrl, {
      params: {
        id: urlObj.searchParams.get("v"),
        part: "snippet",
        key: process.env.YT_API_KEY,
      },
    });

    const temp = response.data.items[0];

    const data = {
      title: temp.snippet.title,
      publishedAt: temp.snippet.publishedAt,
      thumbnail: temp.snippet.thumbnails.maxres,
    };

    return data;
  } catch (error) {
    console.log(error);
  }
}

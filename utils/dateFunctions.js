import axios from "axios";

const getDateImage = async () => {
    const baseUrl=`https://todo-app-backend-theta.vercel.app`;
    const url = `${baseUrl}/api/v1/crawler/scrape`
    try {
      const response = await axios.get(url);
      const { data = null } = response ?? {}
      return data?.imageUrl;
    }
    catch (err) {
      console.error(err);
      return null;
    }
  };

  export {getDateImage}
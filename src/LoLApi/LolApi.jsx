import axios from "axios";
import { useEffect } from "react";
import { BACKEND_PORT } from "../constants";
import { Button } from "react-daisyui";

const LoLApiFeed = () => {
  const BASE_URL = "https://127.0.0.1:2999";
  const ALL_GAME_DATA_ENDPOINT = "/liveclientdata/allgamedata";
  useEffect(() => {
    const getLolInput = async () => {
      const allGameDataUrl = BASE_URL + ALL_GAME_DATA_ENDPOINT;
      const axiosInstance = axios.create();
      const response = await axiosInstance.get(allGameDataUrl);
      const responseData = response.data;
      return responseData;
    };
    const sendLoLInput = async () => {
      const lolInput = await getLolInput();
      await axios.post(
        localStorage.getItem("baseURL") + BACKEND_PORT + "sendLoLInput",
        lolInput
      );
    };
    const intervalId = setInterval(() => {
      sendLoLInput();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <h1>This is getting the lol api</h1>
      <div className="flex flex-col border border-black rounded p-2 items-center gap-2">
        <h1>make sure you have installed the cors unblock browser extension</h1>
        <div className="flex flex-row gap-2">
          <a href="https://addons.mozilla.org/en-US/firefox/addon/cors-unblock/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search">
            <Button color="primary" className="m-4">
              Firefox
            </Button>
          </a>
          <a href="https://chromewebstore.google.com/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino">
            <Button color="secondary" className="m-4">
              Chrome
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};
export default LoLApiFeed;

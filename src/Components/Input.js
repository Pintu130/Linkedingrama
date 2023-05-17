import React, { useState } from "react";
import { FaPaste } from "@react-icons/all-files/fa/FaPaste";
// import { FaPaste } from 'react-icons/FaPaste' ;

function Input() {
  const [inputValue, setInputValue] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pasteLoading, setPasteLoading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [title, setTitle] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setThumbnailUrl("");
    setTitle("");
  };

  const handleDownloadClick = async () => {
    if (inputValue !== "") {
      setLoading(true);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key":
            "bbb4d81518msha7a75f12e5dc90fp125280jsn35ce35c9c80d",
          "X-RapidAPI-Host": "all-media-downloader.p.rapidapi.com",
        },
        body: JSON.stringify({
          url: inputValue,
        }),
      };

      try {
        const response = await fetch(
          "https://all-media-downloader.p.rapidapi.com/dl",
          requestOptions
        );
        const data = await response.json();
        console.log(data);
        setThumbnailUrl(data.thumbnail);
        setTitle(data.title);
        setDownloadUrl(data.formats[0].url);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      alert("Please enter Your Linkedin URL");
    }
  };

  const handlePasteClick = () => {
    setPasteLoading(true);
    navigator.clipboard
      .readText()
      .then((text) => {
        setInputValue(text);
        setPasteLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setPasteLoading(false);
      });
  };

  const handleDownloadVideoClick = () => {
    window.open(downloadUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="bg-blue-200 pb-10">
        <div className="flex justify-center items-center flex-col mx-auto">
          <img
            className="mt-16 w-[90px] "
            src="https://pngmind.com/wp-content/uploads/2019/08/Linkedin-Logo-Png-Transparent-Background-1.png"
            alt={Image}
          />
          <div className=" mt-12 flex flex-col justify-center items-center mx-12 text-center">
            <div className=" text-5xl font-bold">LinkedIn Video Downloader</div>
            <div className=" mt-3 text-4xl ">
              <p>Download LinkedIn videos online</p>
            </div>
          </div>
        </div>

        <div className=" flex-none lg:flex md:flex justify-center mt-10 lg:mx-52 md:mx-24 mx-12">
          <input
            className="rounded-lg text-lg p-2 w-full "
            type="text"
            id="url"
            value={inputValue}
            onChange={handleInputChange}
            inputMode="url"
            placeholder="Enter Snapchat URL"
          />
          <div className="flex justify-center m-5 bg-slate-600 rounded-full py-2 mx-40">
            <button onClick={handlePasteClick} disabled={pasteLoading}>
              <i>
                <FaPaste />
              </i>
            </button>
          </div>

          <div>
            <button
              className="bg-slate-900 rounded-md text-white w-full flex-none  md:w-32 items-center text-lg py-3 "
              onClick={handleDownloadClick}
              disabled={loading}
            >
              <i className="fa fa-link"></i>
              {loading ? "Get Link..." : "Get Link"}
            </button>
          </div>
        </div>

        {downloadUrl && (
          <div className="container p-3 videoTitle">
            <p>{title}</p>
          </div>
        )}
        {downloadUrl && (
          <div className="thumbnail1 container p-2">
            {thumbnailUrl && (
              <img src={thumbnailUrl} className="thumbnail" alt="Thumbnail" />
            )}
          </div>
        )}
        {downloadUrl && (
          <div>
            <button className="download2" onClick={handleDownloadVideoClick}>
              <i className="fa fa-download"></i>Click here to download
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Input;

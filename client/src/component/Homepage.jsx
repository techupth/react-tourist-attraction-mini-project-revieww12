import axios from "axios";
import { useState, useEffect } from "react";

function Homepage() {
  const [trip, setTrip] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  function copyLink(url) {
    navigator.clipboard.writeText(url);

    //setCopySuccess("Copied!");

    setCopySuccess("");
  }

  const getAllTrips = async () => {
    const showAllTrips = await axios.get(
      `http://localhost:4001/trips?keywords=${searchInput}`
    );
    console.log(showAllTrips.data.data);
    setTrip(showAllTrips.data.data);
  };

  useEffect(() => {
    getAllTrips();
  }, [searchInput]);

  return (
    <>
      <h1 className="text-4xl font-thin text-center text-sky-500 m-1 font-kanit">
        เที่ยวไหนดี
      </h1>

      <div className="flex flex-col justify-center ml-36 mr-36">
        <h2 className="ml-0.5 font-kanit">ค้นหาที่เที่ยว</h2>

        <input
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          value={searchInput}
          onChange={(event) => {
            event.preventDefault();
            setSearchInput(event.target.value);
          }}
          className="border-solid  border-slate-300 border-b-2 text-center font-kanit"
        />
      </div>
      <div className="w-100 h-100 font-kanit">
        {trip.map((item, index) => {
          return (
            <div className="w-100vw h-100vh pt-5 pr-5 pb-5 pl-5 ml-10 mt-10 mr-10 flex bg-white shadow-lg shadow-slate-100 rounded-lg">
              <div key={index} className="flex justify-center">
                {item.photos.map((image, index) => {
                  if (index === 0) {
                    return (
                      <div className="flex justify-start gap-10" key={index}>
                        <img src={image} className="w-2/5 h-5/6 rounded-lg" />

                        <div>
                          <a href={item.url} className="text-2xl font-bold">
                            {item.title}
                          </a>
                          <p>{item.description.split("").splice(0, 100)}</p>
                          <a
                            href={item.url}
                            className="text-sky-500 border-solid  border-sky-500 border-b-2"
                          >
                            อ่านต่อ...
                          </a>
                          <div className="flex flex-row gap-5 mb-3 text-gray-500 mt-3">
                            <p className="flex flex-row">
                              {" "}
                              <svg
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.24 2H5.34C3.15 2 2 3.15 2 5.33V7.23C2 9.41 3.15 10.56 5.33 10.56H7.23C9.41 10.56 10.56 9.41 10.56 7.23V5.33C10.57 3.15 9.42 2 7.24 2Z"
                                  fill="#292D32"
                                />
                                <path
                                  opacity="0.4"
                                  d="M18.6695 2H16.7695C14.5895 2 13.4395 3.15 13.4395 5.33V7.23C13.4395 9.41 14.5895 10.56 16.7695 10.56H18.6695C20.8495 10.56 21.9995 9.41 21.9995 7.23V5.33C21.9995 3.15 20.8495 2 18.6695 2Z"
                                  fill="#292D32"
                                />
                                <path
                                  d="M18.6695 13.4302H16.7695C14.5895 13.4302 13.4395 14.5802 13.4395 16.7602V18.6602C13.4395 20.8402 14.5895 21.9902 16.7695 21.9902H18.6695C20.8495 21.9902 21.9995 20.8402 21.9995 18.6602V16.7602C21.9995 14.5802 20.8495 13.4302 18.6695 13.4302Z"
                                  fill="#292D32"
                                />
                                <path
                                  opacity="0.4"
                                  d="M7.24 13.4302H5.34C3.15 13.4302 2 14.5802 2 16.7602V18.6602C2 20.8502 3.15 22.0002 5.33 22.0002H7.23C9.41 22.0002 10.56 20.8502 10.56 18.6702V16.7702C10.57 14.5802 9.42 13.4302 7.24 13.4302Z"
                                  fill="#292D32"
                                />
                              </svg>{" "}
                              หมวด
                            </p>
                            {item.tags.map((item, index) => {
                              return (
                                <div key={index}>
                                  <button
                                    onClick={() => {
                                      setSearchInput(item);
                                    }}
                                    className="rounded-full border border-sky-100 bg-sky-50 px-2 py-0.5"
                                  >
                                    {item}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex flex-row gap-5">
                            {item.photos.map((image, index) => {
                              if (index >= 1) {
                                return (
                                  <div key={index}>
                                    <img
                                      src={image}
                                      className="w-20 h-20 rounded-md"
                                    />
                                  </div>
                                );
                              }
                            })}

                            <div>
                              <button
                                onClick={() => copyLink(item.url)}
                                className="w-24 h-10 pt-2 pl-2 rounded-lg bg-sky-100 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 flex flex-row"
                              >
                                <img
                                  src="./src/img/link-icon.png"
                                  className="w-5 h-5 ml-2 mr-1"
                                />
                                Copy
                              </button>
                              {copySuccess}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default Homepage;

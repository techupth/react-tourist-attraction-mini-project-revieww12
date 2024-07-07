import axios from "axios";
import { useState, useEffect } from "react";
import ModalImage from "react-modal-image";

function Homepage() {
  const [tripsData, setTripsData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  function copyLink(url) {
    navigator.clipboard.writeText(url);
  }

  const getTripsData = async () => {
    const showTripsData = await axios.get(
      `http://localhost:4001/trips?keywords=${searchInput}`
    );
    //console.log(showTripsData.data.data);
    setTripsData(showTripsData.data.data);
  };

  useEffect(() => {
    getTripsData();
  }, [searchInput]);

  const handleTagClick = (tag) => {
    console.log(tag);
    const newTagInput = searchInput + "\n" + tag + " ";
    setSearchInput(newTagInput);
  };
  return (
    <>
      <section className="w-full h-full font-kanit ">
        <h1 className="text-4xl font-bold text-center text-sky-500 pt-5 font-kanit">
          เที่ยวไหนดี
        </h1>
        <div className="flex flex-col justify-center ml-20 mr-20">
          <label className="block font-kanit mt-3" htmlFor="trip">
            ค้นหาที่เที่ยว
          </label>
          <input
            placeholder="หาที่เที่ยวแล้วไปกัน..."
            type="text"
            id="trip"
            value={searchInput}
            onChange={(event) => {
              event.preventDefault();
              setSearchInput(event.target.value);
            }}
            className="w-full rounded-md border-0 py-1.5 mb-5 text-gray-900 border-solid border-slate-300 border-b-2 text-center font-kanit "
          />
        </div>

        <div className="grid grid-rows sm:grid-flow-cols mx-5">
          {tripsData.map((item, index) => {
            return (
              <article
                key={index}
                className="max-w-full md:max-w-fit max-h-full md:max-h-fit pt-3 md:pt-5 pr-5 md:pr-10 pb-3 md:pb-5 pl-5 md:pl-10 mb-5 bg-cyan-50 shadow-md shadow-slate-200 rounded-xl font-kanit"
              >
                <div className="flex flex-col md:flex-row md:gap-10">
                  <img
                    src={item.photos[0]}
                    className="w-full md:w-1/3 rounded-3xl "
                  />

                  <div className="flex flex-col">
                    <a href={item.url} className="text-2xl font-bold">
                      {item.title}
                    </a>
                    <p>{item.description.slice(0, 100)}</p>
                    <a href={item.url} className="text-sky-500 underline">
                      อ่านต่อ...
                    </a>
                    <div className="flex flex-col md:flex-row mb-3 text-gray-500 mt-3">
                      <p>หมวด:</p>
                      {item.tags.map((tag, index) => {
                        return (
                          <div key={index}>
                            <button
                              onClick={() => {
                                handleTagClick(tag);
                              }}
                              className="rounded-full border border-sky-100 bg-white px-2 py-0.5 underline"
                            >
                              {tag}
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
                              <ModalImage
                                small={image}
                                large={image}
                                alt={`Image ${index}`}
                                hideDownload={true}
                                hideZoom={true}
                                className="w-24 h-24 rounded-xl cursor-pointer"
                              />
                            </div>
                          );
                        }
                      })}
                    </div>
                    <button
                      onClick={() => copyLink(item.url)}
                      className="flex flex-row w-28 h-10 mt-5 pt-2 pl-3 rounded-full bg-cyan-300 hover:bg-cyan-400 active:bg-cyan-500 focus:outline-none focus:ring focus:ring-cyan-300 "
                    >
                      <img
                        src="./src/img/link-icon.png"
                        className="w-5 h-5 ml-2 mr-1 mb-2"
                      />
                      copy
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
export default Homepage;

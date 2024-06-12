import axios from "axios";
import { useState, useEffect, useRef } from "react";

function Homepage() {
  const [trip, setTrip] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);

  function copyToClipboard(event) {
    textAreaRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    event.target.focus();
    setCopySuccess("Copied!");
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
      <h1 className="text-4xl font-thin text-center text-sky-500 m-1 ">
        เที่ยวไหนดี
      </h1>
      <div className="flex flex-col justify-center ml-36 mr-36">
        <h2 className="ml-0.5">ค้นหาที่เที่ยว</h2>

        <input
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          value={searchInput}
          onChange={(event) => {
            event.preventDefault();
            setSearchInput(event.target.value);
          }}
          className="border-solid  border-slate-300 border-b-2 text-center"
        />
      </div>
      <div className="w-100 h-100">
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
                          <header className="text-2xl font-bold">
                            {item.title}
                          </header>
                          <p>{item.description.split("").splice(0, 100)}</p>
                          <a
                            href={item.url}
                            className="text-sky-500 border-solid  border-sky-500 border-b-2"
                          >
                            อ่านต่อ...
                          </a>
                          <div className="flex flex-row gap-5 mb-3 text-gray-500">
                            หมวด
                            {item.tags.map((item, index) => {
                              return (
                                <div key={index}>
                                  <button
                                    onClick={() => {
                                      setSearchInput(item);
                                    }}
                                    className=" border-solid  border-gray-500 border-b-2"
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
                            <form>
                              <textarea ref={textAreaRef} value={item.url} />
                            </form>
                            {document.queryCommandSupported("copy") && (
                              <div>
                                <button
                                  onClick={copyToClipboard}
                                  className="w-24 h-10 bg-sky-500 rounded-full"
                                >
                                  Copy
                                </button>
                                {copySuccess}
                              </div>
                            )}
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

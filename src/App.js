import "./App.css";
import { popupWindow } from "./js/window";
import { useEffect, useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";

const apiToken = "5881f5b99ec4711f74ec14d329771249650a2155";
const apiEndpoint = "https://api.pipedrive.com/v1/deals";

function App() {
  const [addressValue, setaddressValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [comment, setComment] = useState("");
  const [tech, setTech] = useState("");
  const [jobSource, setJobSource] = useState("");
  const [jobType, setJobType] = useState("");
  const [date, setDate] = useState("");

  const dealData = {
    title: "TEST for trainee",
    value: 200,
    currency: "USD",
    add_time: "2024-01-31",
    status: "open",
    "0ce422a86cf0a085ef0b7401ae61934f19f8a339": `${addressValue}`,
    "c9ed579c039d93fd95775327d1781f1836ac9328": `${comment}`,
    "588b9e3fe73ef955b605b7119fabd0b3d26c9d94": `${jobSource}`,
    "87370f1534a0e800459543e09a33fd645ddc097a": `${jobType}`,
    "b07be628b8f96ba42b1dae0fe195924eb02fc50c": `${tech}`,
    "07091f3feb03005475707e9a9e385696554f1ab8": `${timeStart}`,
    "0566ee9e656f92f033bc4a4585a68f5721b71601": `${timeEnd}`,
    "30bd92a71fb8cb0950ef1abca005919f540bb893": `${date}`,
  };

  const createDeal = async (event) => {
    if (!addressValue) {
      return;
    }
    event.preventDefault();
    try {
      const response = await axios.post(apiEndpoint, dealData, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          api_token: apiToken,
        },
      });

      console.log("Success: ", response.data);
    } catch (error) {
      console.error(
        "Error: ",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const handleTechChange = (event) => {
    setTech(event.target.value);
  };
  const handleJobSourceChange = (event) => {
    setJobSource(event.target.value);
  };
  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleInputChange = (event, setValue) => {
    setValue(event.target.value.trim());
  };

  const blackBorder = (value) => {
    return value !== "" ? "filled" : "";
  };

  useEffect(() => {
    setTimeStart("08:00");
    setTimeEnd("08:00");
  }, []);

  return (
    <>
      <div className="Create-a-job">
        <span className="new-job" onClick={popupWindow}>
          NEW Create a job
        </span>
        <span className="arrow-job">
          <i className="fa-solid fa-caret-down"></i>
        </span>
      </div>
      <div className="h-screen w-full bgDiv">
        <div
          className="w-1/2 mx-auto rounded-md bg-white"
          style={{
            height: "95vh",
            boxShadow: " 0px 5px 4px 0px rgba(0,0,0,0.4)",
          }}
        >
          <form onSubmit={createDeal}>
            <div className="flex justify-between font-bold header">
              <h1>NEW Create a job</h1>
              <span onClick={popupWindow} className="cursor-pointer">
                &#10006;
              </span>
            </div>
            <div className="grid grid-cols-2 pb-8 pt-10 pr-8 pl-20 gap-8">
              {/* Client details */}
              <div className="infoBlock">
                <span className="font-bold text-2xl">Client details</span>
                <div className="flex justify-between my-2">
                  <input placeholder="Name"></input>
                  <input
                    placeholder="Last name"
                    name="lastName-inp"
                    value={lastNameValue}
                    onChange={(e) => handleInputChange(e, setLastNameValue)}
                    className={blackBorder(lastNameValue)}
                  ></input>
                </div>
                <div className="my-2">
                  <InputMask
                    mask="+1 (999) 999 9999"
                    placeholder="phone"
                    maskChar=""
                    showMask={false}
                  >
                    {() => (
                      <input
                        type="tel"
                        id="phoneInput"
                        className="w-full"
                        placeholder="phone"
                      />
                    )}
                  </InputMask>
                </div>
                <div className="my-2">
                  <input className="w-full" placeholder="email"></input>
                </div>
              </div>
              {/* Job type */}
              <div className="infoBlock">
                <span className="font-bold text-2xl">Job type</span>
                <div className="my-2">
                  <select
                    className="cc"
                    style={{ width: "100%" }}
                    value={jobType}
                    onChange={handleJobTypeChange}
                  >
                    <option value="Select job type" defaultValue>
                      Select job type
                    </option>
                    <option value="Recall job">Recall job</option>
                  </select>
                </div>
                <div className="my-2">
                  <select
                    className="cc"
                    style={{ width: "100%" }}
                    value={jobSource}
                    onChange={handleJobSourceChange}
                  >
                    <option value="Job Source">Select job source</option>
                    <option value="GL Pinellas" defaultValue>
                      GL Pinellas
                    </option>
                  </select>
                </div>
                <div className="my-2">
                  <textarea
                    className="cc"
                    placeholder="Job description (optional)"
                    style={{ width: "100%", height: "6rem" }}
                    value={comment}
                    onChange={handleCommentChange}
                  ></textarea>
                </div>
              </div>
              {/* Service location */}
              <div className="infoBlock">
                <span className="font-bold text-2xl">Service location</span>
                <div className="my-2">
                  <input
                    placeholder="address"
                    required
                    value={addressValue}
                    onChange={(e) => handleInputChange(e, setaddressValue)}
                    className={`${blackBorder(addressValue)} w-full`}
                  ></input>
                </div>
                <div className="my-2">
                  <input
                    className="w-full"
                    placeholder="City"
                    onInput={blackBorder}
                  ></input>
                </div>
                <div className="my-2">
                  <input className="w-full" placeholder="State"></input>
                </div>
                <div className="flex justify-between my-2">
                  <input></input>
                  <select className="cc">
                    <option value="Tampa" defaultValue>
                      Tampa
                    </option>
                  </select>
                </div>
              </div>
              {/* Scheduled */}
              <div className="infoBlock">
                <span className="font-bold text-2xl">Scheduled</span>
                <div className="my-2">
                  <input
                    className="w-full"
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                  />
                </div>
                <div className="flex justify-between my-2">
                  <label
                    className="relative"
                    style={{ width: "calc(100% / 2 - 0.5rem)" }}
                  >
                    <input
                      type="time"
                      style={{ width: "100%" }}
                      name="timeStart-inp"
                      value={timeStart}
                      onChange={(e) => handleInputChange(e, setTimeStart)}
                      className={blackBorder(timeStart)}
                    ></input>
                    <i
                      className="fa-solid fa-chevron-down absolute"
                      style={{ top: "0.6rem", right: "0.2rem" }}
                    ></i>
                  </label>
                  <label
                    className="relative"
                    style={{ width: "calc(100% / 2 - 0.5rem)" }}
                  >
                    <input
                      type="time"
                      style={{ width: "100%" }}
                      value={timeEnd}
                      onChange={(e) => handleInputChange(e, setTimeEnd)}
                      className={blackBorder(timeEnd)}
                    ></input>
                    <i
                      className="fa-solid fa-chevron-down absolute"
                      style={{ top: "0.6rem", right: "0.2rem" }}
                    ></i>
                  </label>
                </div>
                <div className="my-2">
                  <select
                    className="cc"
                    style={{ width: "100%" }}
                    value={tech}
                    onChange={handleTechChange}
                  >
                    <option value="Select technician" defaultValue>
                      Select technician
                    </option>
                    <option value="Timur Yussupov">Timur Yussupov</option>
                    <option value="Nikita Takoy">Nikita Takoy</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="font-bold font-bolder text-2xl pr-8 pl-20 grid gap-8 grid-cols-2">
              <div className="flex justify-end">
                <button className="yellow" onClick={createDeal}>
                  Create job
                </button>
              </div>
              <div className="flex justify-start">
                <button className="gray">Save info</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;

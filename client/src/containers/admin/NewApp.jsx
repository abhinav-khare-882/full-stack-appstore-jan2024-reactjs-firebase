import React, { useState } from "react";
import { InputContainer } from "../../components";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { saveAppDataToCloud } from "../../api/index";
import { serverTimestamp } from "firebase/firestore";
import useApps from "../../hooks/apps/useApps";

const NewApp = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [appIcon, setappIcon] = useState("");
  const [reviews, setreviews] = useState("");
  const [totalReviews, settotalReviews] = useState("");
  const [downloads, setdownloads] = useState("");
  const [cover, setcover] = useState("");
  const [banners, setbanners] = useState([]);
  const [shortDescription, setshortDescription] = useState("");

  const { refetch: refetchAllApps } = useApps();

  const bannerHandleChange = (id, value) => {
    const updated = banners.map((item) => (item.id === id ? { ...item, uri: value } : item));
    setbanners(updated);
  };
  const handleAddInput = () => {
    const newInput = {
      id: banners.length + 1,
      uri: "",
    };
    setbanners((prevState) => [...prevState, newInput]);
  };
  const handleRemoveInput = (id) => {
    const updatedBanners = banners.filter((item) => item.id !== id);
    setbanners(updatedBanners);
  };
  const clearAllFields = async () => {
    setTitle("");
    setCompany("");
    setappIcon("");
    setcover("");
    setreviews("");
    settotalReviews("");
    setdownloads("");
    setshortDescription("");
    setbanners([]);
  };

  const saveTheDoc = async () => {
    const id = `${Date.now()}`;
    const timestamp = serverTimestamp();
    const _doc = {
      _id: id,
      title,
      company,
      appIcon,
      reviews,
      totalReviews,
      downloads,
      cover,
      banners,
      shortDescription,
      timestamp,
    };
    await saveAppDataToCloud(_doc).then((data) => {
      clearAllFields();
      toast.success("Data saved in the cloud");
      refetchAllApps();
    });
  };

  return (
    <div className="w-full flex flex-col item-center justify-start px-4 py-3 gap-2">
      <InputContainer
        placeholder="app title here"
        onChangeText={(data) => setTitle(data)}
        stateValue={title}
      />

      <InputContainer
        placeholder="cover image here"
        onChangeText={(data) => setcover(data)}
        stateValue={cover}
      />

      <div className="w-full flex flex-col items-center justify-start p-2 border border-gray-600 border-dashed rounded-md gap-2">
        {banners.map((input) => (
          <div className="w-full flex items-center justify-center gap-2" key={input.id}>
            <input
              className="w-full h-10 rounded-md outline-none border border-third shadow-md bg-secondary px-4 text-lg font-semibold font-sans"
              type="text"
              placeholder={"banner image url"}
              value={input.uri}
              onChange={(e) => bannerHandleChange(input.id, e.target.value)}
            />
            <div
              className="w-4 h-4 rounded-md flex- items-center justify-cente bg-red-400 cursor-pointer"
              onClick={() => handleRemoveInput(input.id)}
            >
              <FaMinus className="text-textPrimary" />
            </div>
          </div>
        ))}
        <div className="w-full flex items-center cursor-pointer" onClick={handleAddInput}>
          Enter Cover Image URL
          <FaPlus />
        </div>
      </div>

      <InputContainer
        placeholder="company name here"
        onChangeText={(data) => setCompany(data)}
        stateValue={company}
      />

      <InputContainer
        placeholder="app icons image link here"
        onChangeText={(data) => setappIcon(data)}
        stateValue={appIcon}
      />

      <InputContainer
        placeholder="app reviews here"
        onChangeText={(data) => setreviews(data)}
        stateValue={reviews}
      />

      <InputContainer
        placeholder="total reviews here"
        onChangeText={(data) => settotalReviews(data)}
        stateValue={totalReviews}
      />

      <InputContainer
        placeholder="total downloads here"
        onChangeText={(data) => setdownloads(data)}
        stateValue={downloads}
      />

      <textarea
        name=""
        id=""
        cols=""
        rows="10"
        className="w-full rounded-md outline-none border border-third shadow-md bg-secondary px-4 text-lg font-semibold font-sans"
        value={shortDescription}
        onChange={(e) => setshortDescription(e.target.value)}
        placeholder="description here"
      />
      <div className="w-full flex items-center justify-end gap-28">
        <button
          type="button"
          className="border border-gray-600 px-8 py-2 rounded-md hover:border-none hover:bg-gradient-to-br hover:from-heroPrimary hover:to-heroSecondory cursor-pointer hover:text-black transition-all ease-in-out duration-100 active:scale-95 "
          onClick={saveTheDoc}
        >
          Add
        </button>
        <button
          type="button"
          className="border border-gray-600 px-8 py-2 rounded-md hover:border-none hover:bg-gradient-to-br hover:from-heroPrimary hover:to-heroSecondory cursor-pointer hover:text-black transition-all ease-in-out duration-100 active:scale-95 "
          onClick={clearAllFields}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default NewApp;

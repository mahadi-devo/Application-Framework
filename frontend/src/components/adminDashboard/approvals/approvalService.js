import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const getAllWorkShops = async () => {
  try {
    const workShops = await axios.get(
      "http://localhost:5000/api/v1/workshop/all",
      config
    );
    return workShops.data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllResearches = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/v1/researcher/all",
      config
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const updateWorkShopStatus = async (data) => {
  try {
    const workShop = await axios.put(
      "http://localhost:5000/api/v1/workshop/updateStatus",
      data,
      config
    );
    return workShop.data;
  } catch (e) {
    console.log(e);
  }
};

export const updateResearchStatus = async (data) => {
  try {
    const res = await axios.put(
      "http://localhost:5000/api/v1/researcher/updateStatus",
      data,
      config
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

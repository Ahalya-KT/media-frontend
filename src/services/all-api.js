import { BASE_URL } from "./baseurl";
import { commanRequest } from "./commanrequest";

//Add videos post method
export const addVideo = async (body) => {
  return await commanRequest("POST", `${BASE_URL}/videos`, body);
};

//get videos
export const getVideo = async () => {
  return await commanRequest("GET", `${BASE_URL}/videos`, "");
};

//delete video

export const deleteVideo = async (id) => {
  return await commanRequest("DELETE", `${BASE_URL}/videos/${id}`, {});
};

//add categories
export const addCategories = async (body) => {
  return await commanRequest("POST", `${BASE_URL}/category`, body);
};

//getall category
export const getallcategory = async () => {
  return await commanRequest("GET", `${BASE_URL}/category`, "");
};

//delete category
export const deleteCategory = async (id) => {
  return await commanRequest("DELETE", `${BASE_URL}/category/${id}`, {});
};

//gethistory
export const gethistory = async () => {
  return await commanRequest("GET", `${BASE_URL}/Watchhistory`);
};

//add history
export const Addhistory = async (body) => {
  return await commanRequest("POST", `${BASE_URL}/Watchhistory`, body);
};

//get single videos
export const getvideo = async (id) => {
  return await commanRequest("GET", `${BASE_URL}/videos/${id}`, "");
};

//update category

export const updateCategory = async (id, body) => {
  commanRequest("PUT", `${BASE_URL}/category/${id}`, body);
};

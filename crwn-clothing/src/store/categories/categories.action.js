import { createAction } from "../../utils/reducer/reducer.util";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";

console.log("inside the category action");

export const setCategories = (categoriesArray) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);

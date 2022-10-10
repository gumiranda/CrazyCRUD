import { adaptRoute } from "@/application/adapters";
import {
  makeAddFakenewsController,
  makeLoadFakenewsController,
  makeDeleteFakenewsController,
  makeUpdateFakenewsController,
  makeLoadFakenewsByPageController,
} from "@/slices/fakenews/controllers";

export const addFakenewsAdapter = () => adaptRoute(makeAddFakenewsController());
export const loadFakenewsAdapter = () => adaptRoute(makeLoadFakenewsController());
export const loadFakenewsByPageAdapter = () =>
  adaptRoute(makeLoadFakenewsByPageController());
export const deleteFakenewsAdapter = () => adaptRoute(makeDeleteFakenewsController());
export const updateFakenewsAdapter = () => adaptRoute(makeUpdateFakenewsController());

import { authLogged } from "@/application/infra/middlewares";
import {
  addFakenewsAdapter,
  loadFakenewsAdapter,
  deleteFakenewsAdapter,
  updateFakenewsAdapter,
  loadFakenewsByPageAdapter,
} from "./fakenewsAdapter";
import {
  addFakenewsPostSchema,
  loadFakenewsGetSchema,
  deleteFakenewsSchema,
  updateFakenewsSchema,
  loadFakenewsByPageGetSchema,
} from "./fakenewsSchema";

async function fakenews(fastify: any, options: any) {
  fastify.addHook("preHandler", authLogged());
  fastify.post("/fakenews/add", addFakenewsPostSchema, addFakenewsAdapter());
  fastify.get("/fakenews/load", loadFakenewsGetSchema, loadFakenewsAdapter());
  fastify.get(
    "/fakenews/loadByPage",
    loadFakenewsByPageGetSchema,
    loadFakenewsByPageAdapter()
  );
  fastify.delete("/fakenews/delete", deleteFakenewsSchema, deleteFakenewsAdapter());
  fastify.patch("/fakenews/update", updateFakenewsSchema, updateFakenewsAdapter());
}
export { fakenews };

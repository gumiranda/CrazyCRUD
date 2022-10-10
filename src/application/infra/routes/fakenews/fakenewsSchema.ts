const bodyAddFakenewsJsonSchema = {
  type: "object",
  required: ["sigiloDe100Anos"],
  properties: {
    sigiloDe100Anos: { type: "boolean" },
  },
};
const headersJsonSchema = {
  type: "object",
  properties: {
    authorization: { type: "string" },
  },
  required: ["authorization"],
};
const addFakenewsResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    sigiloDe100Anos: { type: "boolean" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const addFakenewsPostSchema = {
  schema: {
    body: bodyAddFakenewsJsonSchema,
    response: { 200: addFakenewsResponse },
    headers: headersJsonSchema,
  },
};

const queryStringJsonLoadFakenewsSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const loadFakenewsResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    sigiloDe100Anos: { type: "boolean" },
    active: { type: "boolean" },
    createdById: { type: "string" },
    createdAt: { type: "string" },
  },
};
export const loadFakenewsGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadFakenewsSchema,
    response: {
      200: loadFakenewsResponse,
    },
  },
};
const deleteFakenewsResponse = { type: "boolean" };
const queryStringJsonDeleteFakenewsSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
export const deleteFakenewsSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonDeleteFakenewsSchema,
    response: {
      200: deleteFakenewsResponse,
    },
  },
};
const queryStringJsonUpdateFakenewsSchema = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
  },
  required: ["_id"],
};
const updateFakenewsResponse = {
  type: "object",
  properties: {
    _id: { type: "string", maxLength: 24, minLength: 24 },
    sigiloDe100Anos: { type: "boolean" },
    createdById: { type: "string" },
  },
};
const updateFakenewsBody = {
  type: "object",
  properties: {
    sigiloDe100Anos: { type: "boolean" },
  },
};
export const updateFakenewsSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonUpdateFakenewsSchema,
    body: updateFakenewsBody,
    response: {
      200: updateFakenewsResponse,
    },
  },
};
const queryStringJsonLoadFakenewsByPageSchema = {
  type: "object",
  properties: {
    page: { type: "integer", minimum: 1 },
    sortBy: { type: "string" },
    typeSort: { type: "string" },
  },
  required: ["page"],
};
const loadFakenewsByPageResponse = {
  type: "object",
  properties: {
    fakenewss: {
      type: "array",
      maxItems: 10,
      items: {
        type: "object",
        properties: {
          _id: { type: "string", maxLength: 24, minLength: 24 },
          sigiloDe100Anos: { type: "boolean" },
          active: { type: "boolean" },
          createdById: { type: "string" },
          createdAt: { type: "string" },
        },
      },
    },
    total: { type: "integer" },
  },
};
export const loadFakenewsByPageGetSchema = {
  schema: {
    headers: headersJsonSchema,
    querystring: queryStringJsonLoadFakenewsByPageSchema,
    response: {
      200: loadFakenewsByPageResponse,
    },
  },
};

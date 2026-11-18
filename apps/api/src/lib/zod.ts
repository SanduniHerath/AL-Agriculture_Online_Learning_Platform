import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

/**
 * Zod with `.openapi()` added, so request/response schemas double as API documentation.
 * API code imports `z` from here (not from "zod") whenever a schema appears in the docs.
 */
extendZodWithOpenApi(z);

export { z };

import { GoAegisClient } from "@goaegis/sdk";

import { config } from "../config.js";

export const apiClient = new GoAegisClient({
  baseUrl: config.apiBaseUrl
});


import { SANITY_DATASET, SANITY_PROJECT_ID } from "@/shared/consts";
import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2023-05-10",
});

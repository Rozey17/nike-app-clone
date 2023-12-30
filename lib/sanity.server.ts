import sanityClient from "@sanity/client";
export const client = sanityClient({
  dataset: "production",
  projectId: "5spod2i4",
  useCdn: true,
  token:
    "skFJmnUEh0negQbPWeMscOYa7oKjOvdof7yEk6OMs8vl1JIAljPbZMeD3k1ChUlvoJuKJQg2unVnAP7q53Y28cfxz3bRorShnu0qN3DyJWqpzatQZciAFnYSoW96tKh0uL7tduC7CWzggOZV7ByANym112spaTY1B72575lFnSyBV1vPU3R0",
  apiVersion: "2021-03-25",
});

module.exports = {
  images: {
    domains: [
      "cmswarsztatstrapiapp.azurewebsites.net",
      "strapiwarsztat.blob.core.windows.net",
    ],
  },
  settings: {
    cors: {
      origin: ["*"], //allow all origins
      headers: ["*"], //allow all headers
    },
  },
};

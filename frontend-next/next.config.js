/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "cmswarsztatstrapiapp.azurewebsites.net", "strapiwarsztat.blob.core.windows.net"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compiler: {
    styledComponents: true,
  },
  publicRuntimeConfig: {
    apiUrl: 'https://cmswarsztatstrapiapp.azurewebsites.net'
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/',
        permanent: true
      },
      {
        source: '/registration',
        destination: '/',
        permanent: true
      }
    ]
  },
  reactStrictMode: false,
  output: "standalone",
};

module.exports = nextConfig;

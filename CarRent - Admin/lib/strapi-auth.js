import axios from "axios";

export const strapiUrl = "https://cmswarsztatstrapiapp.azurewebsites.net";

export async function signIn({ identifier, password }) {
  const res = await axios.post(`${strapiUrl}/api/auth/local`, {
    identifier,
    password,
  });
  return res.data;
}

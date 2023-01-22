export const StrapiURL = "https://cmswarsztatstrapiapp.azurewebsites.net";

export default async function fetcher(endpoint, options = {}) {
  let response;
  const url = `${StrapiURL}/api/${endpoint}`;
  if (!options) {
    response = await fetch(url);
  } else {
    response = await fetch(url, options);
  }
  const data = await response.json();
  return data;
}

export async function poster(endpoint, data, jwt) {
  const url = `${StrapiURL}/api/${endpoint}`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  const resp = await response.json();
  return resp;
}

export async function photoPoster(endpoint, data, jwt) {
  const url = `${StrapiURL}/api/${endpoint}`;
  const response = await fetch(url, {
    method: "POST",
    body: data,
    headers: {
      // "Content-Type":
      //   "multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
      Authorization: `Bearer ${jwt}`,
    },
  });

  const resp = await response.json();
  return resp;
}

export async function putter(endpoint, data, jwt) {
  const url = `${StrapiURL}/api/${endpoint}`;
  console.log(jwt);
  await fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
}

export async function deleter(endpoint, jwt) {
  const url = `${StrapiURL}/api/${endpoint}`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
}

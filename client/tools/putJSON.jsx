export async function putJSON(url, object) {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(object),
  });
  if (!res.ok) {
    throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
  }
}

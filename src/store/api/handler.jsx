import axios from "axios";
import { get } from "lodash";
import { getDefaultHeaders, getQuery } from "../utils";
import { unAutherizeDirect } from "../../utils/method";

async function handleResp(resp) {
  const { error, data } = resp;
  if (!error) return { error, data: data.data };
  return resp;
}

function handleErrorResp(err) {
  console.log(err);
  try {
    const error = get(err, "response.data") || get(err, "response");
    // if (get(err, "response.status") === 401) unAutherizeDirect();
    return { error: true, data: error };
  } catch (error) {
    return { error: true, data: error };
  }
}

async function POST(url, data, headers) {
  try {
    if (!headers) headers = getDefaultHeaders();
    const resp = await axios({ method: "POST", url, data, headers });
    console.log("[POST]", url, data);
    return get(resp, "data.data.error")
      ? handleErrorResp(resp.data.error)
      : resp.data;
  } catch (err) {
    console.log("[POST: ERROR]", url, err);

    return handleErrorResp(err);
  }
}

async function GET(url, data, headers) {
  try {
    if (!headers) headers = getDefaultHeaders();
    if (data) url += getQuery(url, data);
    const resp = await axios({ method: "GET", url, headers });
    console.log("[GET]", url, resp);
    return get(resp, "data.data.error")
      ? handleErrorResp(resp.data.error)
      : resp.data;
  } catch (err) {
    console.log("[GET: ERROR]", url, err);
    return handleErrorResp(err);
  }
}

async function PUT(url, data, headers) {
  try {
    if (!headers) headers = getDefaultHeaders();
    const resp = await axios({ method: "PUT", url, data, headers });
    console.log("[PUT]", url, data);
    return get(resp, "data.data.error")
      ? handleErrorResp(resp.data.error)
      : resp.data;
  } catch (err) {
    console.log("[PUT: ERROR]", url, err);
    return { error: true, data: handleErrorResp(err) };
  }
}

async function PATCH(url, data, headers) {
  try {
    if (!headers) headers = getDefaultHeaders();
    const resp = await axios({ method: "PATCH", url, data, headers });
    console.log("[PATCH]", url, data, resp);
    return get(resp, "data.data.error")
      ? handleErrorResp(resp.data.error)
      : resp.data;
  } catch (err) {
    console.log("[PATCH: ERROR]", url, err);
    return handleErrorResp(err);
  }
}

async function DELETE(url, headers) {
  try {
    if (!headers) headers = getDefaultHeaders();
    const resp = await axios({ method: "DELETE", url, headers });
    console.log("[DELETE]", url);
    return get(resp, "data.data.error")
      ? handleErrorResp(resp.data.error)
      : resp.data;
  } catch (err) {
    return handleErrorResp(err);
  }
}

export default { GET, POST, PUT, PATCH, DELETE, handleResp };

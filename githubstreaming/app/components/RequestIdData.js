import { RequestNetwork, Types } from "@requestnetwork/request-client.js";

export const getRequestIdData = async (requestId) => {
  const requestClient = new RequestNetwork({
    nodeConnectionConfig: { 
      baseURL: "https://sepolia.gateway.request.network/",
    },
  });
  const request = await requestClient.fromRequestId(requestId);
  const requestData = request.getData();
  return requestData;
};

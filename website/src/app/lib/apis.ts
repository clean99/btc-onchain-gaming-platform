'use server';
// Define a type for the API call options
interface ApiCallOptions {
  method: string;
  headers: {
    Authorization: string;
    'Content-Type': string;
  };
  body?: string;
}

// Define a generic function to make API calls
async function apiCall(method: string, endpoint: string, data: any = null): Promise<any> {
  const url = `https://open-api-fractal.unisat.io${endpoint}`;
  const options: ApiCallOptions = {
    method: method,
    headers: {
      'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
      'Content-Type': 'application/json'
    }
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error making API call:', error);
    throw error;
  }
}

// Define types for the response structure
interface InscriptionItem {
  inscriptionId: string;
  inscriptionNumber: number;
  isBRC20: boolean;
  moved: boolean;
  offset: number;
}

interface UTXO {
  address: string;
  codeType: number;
  height: number;
  idx: number;
  inscriptions: InscriptionItem[];
  isOpInRBF: boolean;
  satoshi: number;
  scriptPk: string;
  scriptType: string;
  txid: string;
  vout: number;
}

interface InscriptionData {
  address: string;
  inscriptionId: string;
  inscriptionNumber: number;
  contentType: string;
  contentLength: number;
  offset: number;
  timestamp: number;
  utxo: UTXO;
}

interface InscriptionResponseData {
  cursor: number;
  total: number;
  totalConfirmed: number;
  totalUnconfirmed: number;
  totalUnconfirmedSpend: number;
  inscription: InscriptionData[];
}

interface InscriptionResponse {
  code: 0 | -1;
  msg: string;
  data: InscriptionResponseData;
}

// Function to get inscription data by address with query parameters for pagination
export async function getInscriptionData(address: string, cursor: number = 0, size: number = 16): Promise<InscriptionResponse> {
  const endpoint = `/v1/indexer/address/${address}/inscription-data?cursor=${cursor}&size=${size}`;
  return await apiCall('GET', endpoint) as InscriptionResponse;
}

// Define a type for the order data
interface OrderData {
  receiveAddress: string; // Bitcoin address to receive the inscriptions
  feeRate: number; // The fee rate of transaction
  outputValue: number; // The balance of inscription
  files: Array<{
    filename: string;
    dataURL: string;
  }>; // List of files with filename and dataURL
  devAddress: string; // Developer address to receive extra fee
  devFee: number; // Developer fee
}

// Function to create an inscribe order
export async function createInscribeOrder(orderData: OrderData): Promise<any> {
  const endpoint = '/v2/inscribe/order/create';
  return await apiCall('POST', endpoint, orderData);
}





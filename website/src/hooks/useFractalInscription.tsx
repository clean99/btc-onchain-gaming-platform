'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCollections } from './useCollections';
import { Inscription } from '@/types';

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

export const useFractalInscription = (address: string, cursor: number = 0, size: number = 16) => {
  const [data, setData] = useState<Inscription[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { collections } = useCollections();

  const isOurInscription = (inscription: Inscription): boolean => {
    if (!collections) return false;
    return collections.some(collection => collection.collection_id === inscription.collection_id);
  };

  useEffect(() => {
    if(!collections?.length) {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.get<InscriptionResponse>(
          `https://open-api-fractal-testnet.unisat.io/v1/indexer/address/${address}/inscription-data?cursor=${cursor}&size=${size}`,
          {
            headers: {
              'Authorization': 'Bearer 69ee100b82db27f0df46969fdbaae818a934c64d77a3735aae372252870ceefa',
              'Content-Type': 'application/json'
            }
          }
        );
        if (response.data.code !== 0) {
          throw new Error(`API error: ${response.data.msg}`);
        }

        const inscriptionsIds = response.data.data.inscription.map((inscription) => inscription.inscriptionId);
        const fetchInscriptionDetails = async (inscriptionId: string) => {
          try {
            const response = await axios.get(`https://open-api-fractal-testnet.unisat.io/v1/indexer/inscription/content/${inscriptionId}`,
                {
                    headers: {
                      'Authorization': 'Bearer 69ee100b82db27f0df46969fdbaae818a934c64d77a3735aae372252870ceefa',
                      'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
          } catch (error) {
            console.error(`Error fetching details for inscription ID ${inscriptionId}:`, error);
            return null;
          }
        };

        const fetchAllInscriptionDetails = async () => {
          const promises = inscriptionsIds.map(inscriptionId => fetchInscriptionDetails(inscriptionId));
          const results = await Promise.all(promises);
          return results.filter(result => result !== null).filter(result => isOurInscription(result));
        };

        const inscriptionDetailsArray = await fetchAllInscriptionDetails();
        
        setData(inscriptionDetailsArray);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [address, cursor, size, collections]);

  return { data, loading, error };
};

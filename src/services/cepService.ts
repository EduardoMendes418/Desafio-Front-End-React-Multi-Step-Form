import axios from 'axios';

export interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export const fetchAddressByCEP = async (cep: string): Promise<ViaCEPResponse | null> => {
  try {
    const cleanedCEP = cep.replace(/\D/g, '');
    if (cleanedCEP.length !== 8) return null;
    
    const response = await axios.get(`https://viacep.com.br/ws/${cleanedCEP}/json/`);
    
    if (response.data.erro) {
      return null;
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching CEP:', error);
    return null;
  }
};
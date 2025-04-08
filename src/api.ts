import { ChampionResponse, PaginatedChampionResponse } from "./types/champion";
import { ItemResponse, PaginatedItemResponse } from "./types/items";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:8000';

export class Api {
    async fetchFromApi<T>(url: string): Promise<T | null> {
        let response: Response | undefined;
        try {
          response = await fetch(url);
        } catch (e) {
          console.error('error fetching from api', url, e);
          return null;
        }
    
        if (!response.ok) {
          console.error('non 2xx status from API', url);
          return null;
        }
    
        if (response.status === 404) {
          console.error('404 from API', url);
          return null;
        }
    
        let json: unknown;
        try {
          json = await response.json();
        } catch (e) {
          console.error('error parsing json', url, e);
          return null;
        }
    
        return json as T;
      }

    async getChampions(page = 1, limit = 20): Promise<PaginatedChampionResponse | null> {
        const url = `${BASE_URL}/champions?page=${page}&limit=${limit}`;
        return this.fetchFromApi<PaginatedChampionResponse>(url);
    }
      

    async getChampionById(id: string): Promise<ChampionResponse | null> {
        const url = `${BASE_URL}/champions/${id}`;
        return this.fetchFromApi<ChampionResponse>(url);
    }

    async getItems(page = 1, limit = 20): Promise<PaginatedItemResponse | null> {
        const url = `${BASE_URL}/items?page=${page}&limit=${limit}`;
        return this.fetchFromApi<PaginatedItemResponse>(url);
    }

    async getItemById(id: string): Promise<ItemResponse | null> {
        const url = `${BASE_URL}/items/${id}`;
        return this.fetchFromApi<ItemResponse>(url);
    }
}


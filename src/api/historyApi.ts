import client from './client';

export interface HistoryRequest {
  algorithmName: string;
  arraySize: number;
  comparisonCount: number;
  swapCount: number;
  executionTimeMs: number;
}

export interface HistoryResponse {
  id: number;
  algorithmName: string;
  arraySize: number;
  comparisonCount: number;
  swapCount: number;
  executionTimeMs: number;
  createdAt: string;
}

export interface PagedHistory {
  content: HistoryResponse[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export const historyApi = {
  saveHistory: async (data: HistoryRequest): Promise<HistoryResponse> => {
    const response = await client.post<HistoryResponse>('/history', data);
    return response.data;
  },

  getHistory: async (page = 0, size = 10): Promise<PagedHistory> => {
    const response = await client.get<PagedHistory>('/history', {
      params: { page, size },
    });
    return response.data;
  },
};

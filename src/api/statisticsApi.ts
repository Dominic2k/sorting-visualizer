import client from './client';

export interface StatisticsResponse {
  algorithmName: string;
  totalRuns: number;
  avgComparisons: number;
  avgSwaps: number;
  lastUpdated: string;
}

export const statisticsApi = {
  getAllStatistics: async (): Promise<StatisticsResponse[]> => {
    const response = await client.get<StatisticsResponse[]>('/statistics');
    return response.data;
  },

  getStatisticsByAlgorithm: async (algorithmName: string): Promise<StatisticsResponse> => {
    const response = await client.get<StatisticsResponse>(`/statistics/${algorithmName}`);
    return response.data;
  },
};

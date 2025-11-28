export interface Show {
  rank: number;
  title: string;
  genre: string;
  synopsis: string;
  rating: string; // e.g., "98% Match"
  weeksInTop10: number;
}

export interface GroundingSource {
  title?: string;
  uri?: string;
}

export interface TrendingData {
  shows: Show[];
  sources: GroundingSource[];
}

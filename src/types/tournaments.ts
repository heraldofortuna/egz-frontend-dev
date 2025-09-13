export interface Tournament {
  id: string;
  name: string;
  start_date: string;
  quota: number;
  reward: number;
  stage: TournamentStage;
  level: string;
  is_enrolled_user: boolean;
  active_for_user: boolean;
  description?: string;
  end_date?: string;
  max_participants: number;
  current_participants: number;
  entry_fee?: number;
  rules?: string;
  created_at: string;
  updated_at: string;
}

export type TournamentStage = 
  | 'EN ESPERA'
  | 'GRUPOS'
  | 'OCTAVOS'
  | 'CUARTOS'
  | 'SEMI-FINAL'
  | 'FINAL'
  | 'TERMINADO';

export interface TournamentsApiResponse {
  data: Tournament[];
  meta?: {
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
  };
}

export interface AxiosTournamentsResponse {
  data: TournamentsApiResponse;
  status: number;
  statusText: string;
  headers: any;
  config: any;
}
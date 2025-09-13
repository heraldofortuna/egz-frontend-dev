import TournamentCard from './TournamentCard';

interface TournamentsListProps {
  tournaments: any;
}

const TournamentsList = ({ tournaments }: TournamentsListProps) => {
  return (
    <ul className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8">
      {tournaments.map((tournament: any) => {
        const id = tournament.id;
        const title = tournament.name;
        const startDate = tournament.start_date;
        const quota = tournament.quota;
        const reward = tournament.reward;
        const stage = tournament.stage;
        const level = parseInt(tournament.level);
        const isEnrolledUser = tournament.is_enrolled_user;
        const isUnlevel = !tournament.active_for_user && !isEnrolledUser;

        const colorByStage: any = {
          'EN ESPERA': isEnrolledUser ? 'green' : 'blue',
          GRUPOS: 'yellow',
          OCTAVOS: 'orange',
          CUARTOS: 'orange',
          'SEMI-FINAL': 'orange',
          FINAL: 'orange',
          TERMINADO: 'red',
        };

        const color = colorByStage[stage];

        return (
          <li key={id}>
            <TournamentCard
              id={id}
              title={title}
              startDate={startDate}
              quota={quota}
              reward={reward}
              stage={stage}
              level={level}
              color={color}
              isEnrolled={isEnrolledUser}
              isUnlevel={isUnlevel}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default TournamentsList;

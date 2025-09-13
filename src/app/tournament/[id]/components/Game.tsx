'use client';
import Image from 'next/image';
import { useState } from 'react';
import formatHour from '@actions/formatHour';
import isToday from '@actions/isToday';
import Switch from '@components/Switch';
import { PlayResult } from '@customtypes/components';
import NormalPlay from './NormalPlay';
import HardPlay from './HardPlay';

interface IGameProps {
  data: any;
  phaseDate: string;
  isShowed: boolean;
  isPastPhase: boolean;
  onChange: (result: PlayResult) => void;
}

const Game = ({
  data,
  phaseDate,
  isShowed,
  isPastPhase,
  onChange,
}: IGameProps) => {
  const currentPlay = data.plays.find((play: any) => play.isUserPlay);

  const userPlay = currentPlay?.isLocalUser
    ? currentPlay?.localPlays
    : currentPlay?.visitPlays;

  const [result, setResult] = useState<PlayResult>(userPlay);

  const getStatusBasedOnTime = (inputTime: string): any => {
    if (!inputTime) {
      return <></>;
    }

    const inputTimeNum = inputTime.split(':').map(Number);
    const [inputHours, inputMinutes, inputSeconds] = inputTimeNum;
    const inputDate = new Date();
    let statusText = formatHour(inputTime);

    inputDate.setHours(inputHours, inputMinutes, inputSeconds, 0);

    const currentDate = new Date();
    const currentDateTime = currentDate.getTime();
    const inputDateTime = inputDate.getTime();
    const diffInMilliseconds = currentDateTime - inputDateTime;
    const diffInMinutes = diffInMilliseconds / (1000 * 60);

    if (isToday(phaseDate) && !isPastPhase) {
      if (diffInMinutes <= 100 && diffInMinutes > 0) {
        statusText = 'En vivo';

        return (
          <p className="bg-green-color-2 text-center text-xs md:text-sm py-1 px-2 rounded-lg">
            {statusText}
          </p>
        );
      } else if (diffInMinutes > 100) {
        statusText = 'Terminó';

        return (
          <p className="bg-red-color-2 text-center text-xs md:text-sm py-1 px-2 rounded-lg">
            {statusText}
          </p>
        );
      } else {
        return;
      }
    } else {
      return;
    }
  };

  const handleSwitchChange = (selectedOption: string) => {
    const updatedResult = {
      ...result,
      type: selectedOption,
    };

    setResult(updatedResult);
    onChange(updatedResult);
  };

  const handleGameResult = (result: PlayResult) => {
    setResult(result);
    onChange(result);
  };

  const date = formatHour(data.hour);
  const dateStatus = getStatusBasedOnTime(data.hour);
  const isPastGame = data.isPast;

  return (
    <li
      className={`h-full flex border-b last:border-b-0 last:border-r-0 md:border-b-0 md:last:border-b-0 md:border-r ${isPastPhase ? 'border-gray-color-3' : 'border-blue-color-3'}`}
    >
      <div className="flex flex-col flex-grow justify-between">
        {/* Datos del Game */}
        <div className="w-full flex flex-col flex-grow gap-4 p-4">
          <div className="h-6 md:h-7 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              <Image
                className="w-4 md:w-[18px] h-4 md:h-[18px]"
                width={16}
                height={16}
                src="/clock.svg"
                alt="Hora de comienzo del game"
                priority
              />
              <p className="text-center text-xs md:text-sm">{date}</p>
            </div>
            <div className="flex items-center gap-1">{dateStatus}</div>
            {data.isPast ? (
              <></>
            ) : (
              <Switch
                value={result.type}
                options={['NORMAL', 'ARRIESGADA']}
                onChange={handleSwitchChange}
              />
            )}
          </div>
          <div className="w-full flex flex-grow justify-between gap-2">
            <div className="w-[40%] flex flex-col items-center justify-between gap-2 md:gap-4">
              <div className="flex flex-col items-center gap-2 flex-grow">
                <Image
                  className="w-10 md:w-12 h-10 md:h-12"
                  width={40}
                  height={40}
                  src={data.homeLogo}
                  alt="Escudo del equipo local"
                  priority
                />
                <p className="text-center text-xs md:text-sm">
                  {data.homeTeam}
                </p>
              </div>
              {data.isPast ? (
                <span className="text-center text-xl md:text-2xl font-medium">
                  {data.homeScore}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className="w-[10%] flex items-center justify-center">
              <span className="text-lg md:text-xl">vs</span>
            </div>
            <div className="w-[40%] flex flex-col items-center justify-between gap-2 md:gap-4">
              <div className="flex flex-col items-center gap-2 flex-grow">
                <Image
                  className="w-10 md:w-12 h-10 md:h-12"
                  width={40}
                  height={40}
                  src={data.awayLogo}
                  alt="Escudo del equipo visitante"
                  priority
                />
                <p className="text-center text-xs md:text-sm">
                  {data.awayTeam}
                </p>
              </div>
              {data.isPast ? (
                <span className="text-center text-xl md:text-2xl font-medium">
                  {data.awayScore}
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        {/* Resultados del Game */}
        {isShowed ? (
          isPastPhase ? (
            <ul
              className={`w-full flex flex-col border-t ${isPastPhase ? 'border-gray-color-3' : 'border-blue-color-3'}`}
            >
              {data.plays.map((play: any, index: number) => (
                <li key={`${data.id}-play-${index}`}>
                  <div>
                    <div className="border-y border-gray-color-1 p-2">
                      <p className="text-center text-sm md:text-base">
                        {play.localTeamName}
                      </p>
                    </div>
                    {play.localPlays.type === 'NORMAL' ? (
                      <NormalPlay
                        data={play.localPlays}
                        isDisabled
                        onChange={handleGameResult}
                      />
                    ) : play.localPlays.type === 'ARRIESGADA' ? (
                      <HardPlay
                        data={play.localPlays}
                        isPastGame={data.isPast}
                        isDisabled
                        onChange={handleGameResult}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    <div className="border-y border-gray-color-1 p-2">
                      <p className="text-center text-sm md:text-base">
                        {play.visitTeamName}
                      </p>
                    </div>
                    {play.visitPlays.type === 'NORMAL' ? (
                      <NormalPlay
                        data={play.visitPlays}
                        isDisabled
                        onChange={handleGameResult}
                      />
                    ) : play.visitPlays.type === 'ARRIESGADA' ? (
                      <HardPlay
                        data={play.visitPlays}
                        isPastGame={data.isPast}
                        isDisabled
                        onChange={handleGameResult}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="w-full flex flex-col border-t border-blue-color-3">
              {result.type === 'NORMAL' ? (
                <NormalPlay
                  data={userPlay}
                  isDisabled={isPastGame}
                  onChange={handleGameResult}
                />
              ) : result.type === 'ARRIESGADA' ? (
                <HardPlay
                  data={userPlay}
                  isPastGame={data.isPast}
                  isDisabled={isPastGame}
                  onChange={handleGameResult}
                />
              ) : (
                <></>
              )}
            </div>
          )
        ) : (
          <></>
        )}
      </div>
    </li>
  );
};

export default Game;

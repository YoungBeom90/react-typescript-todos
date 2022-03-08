import React from 'react';
import {hourSelector, minuteState} from "./atoms";
import {useRecoilState, useRecoilValue} from "recoil";

const App = () => {
    const [minutes, setMinutes] = useRecoilState(minuteState);
    const [hours, setHours] = useRecoilState(hourSelector);
    const onMinuteChange = (event : React.FormEvent<HTMLInputElement>) =>
        setMinutes( +event.currentTarget.value );
    const onHoursChange = (event : React.FormEvent<HTMLInputElement>) =>
        setHours( +event.currentTarget.value );
  return (
      <div>
        <input
            type="number"
            placeholder="Minutes"
            value={minutes}
            onChange={onMinuteChange}
        />
        <input
            type="number"
            placeholder="Hours"
            value={hours}
            onChange={onHoursChange}
        />
      </div>
  );
};

export default App;


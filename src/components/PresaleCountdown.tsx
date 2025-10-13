import Countdown, { zeroPad } from "react-countdown";
import config from "../config";
import PresaleCountdownItem from "./PresaleCountdownItem";

const PresaleCountdown = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8">
      <h4 className="text-4xl">Presale Starts in</h4>

      <Countdown
        date={config.presaleStartTime * 1000}
        renderer={({ days, hours, minutes, seconds }) => (
          <div className="grid grid-cols-3 items-center justify-center gap-4 px-6 lg:gap-7">
            <PresaleCountdownItem
              label="Days"
              value={(days / 30) * 100}
              time={zeroPad(days)}
            />

            <PresaleCountdownItem
              label="Hours"
              value={(hours / 60) * 100}
              time={zeroPad(hours)}
            />

            <PresaleCountdownItem
              label="Minutes"
              value={(minutes / 60) * 100}
              time={zeroPad(minutes)}
            />
          </div>
        )}
      />
    </div>
  );
};

export default PresaleCountdown;

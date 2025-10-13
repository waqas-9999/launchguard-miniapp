type PresaleCountdownItemProps = {
  label: string;
  value: number;
  time: string;
};

const PresaleCountdownItem = ({ label, time }: PresaleCountdownItemProps) => {
  return (
    <h4 className="flex flex-col items-center rounded-3xl bg-primary p-4 text-black">
      <span className="text-2xl font-semibold">{time}</span>
      <span className="text-sm lg:text-base">{label}</span>
    </h4>
  );
};

export default PresaleCountdownItem;

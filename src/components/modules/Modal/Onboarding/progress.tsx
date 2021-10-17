const ProgressSection = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full rounded-full h-2 bg-gray-400">
      <div
        className="h-2 rounded-full bg-blue-500"
        style={{ width: `${(progress / 3) * 100}%` }}
      ></div>
    </div>
  );
};

export default ProgressSection;

export const TaskTab = ({ first, second, third, fourth, fifth }) => {
  return (
    <div
      key={first}
      className="grid w-full cursor-pointer grid-cols-5 rounded-md border border-neutral-400 transition-all hover:border-neutral-300 hover:ring-2 hover:ring-neutral-300 active:scale-95"
    >
      <h4 className="p-4 first:rounded-l-md last:rounded-r-md odd:bg-neutral-700">
        {first}
      </h4>
      <h4 className="p-4 first:rounded-l-md last:rounded-r-md odd:bg-neutral-700">
        {second}
      </h4>
      <h4 className="p-4 first:rounded-l-md last:rounded-r-md odd:bg-neutral-700">
        {third}
      </h4>
      <h4 className="p-4 first:rounded-l-md last:rounded-r-md odd:bg-neutral-700">
        {fourth}
      </h4>
      <h4 className="p-4 first:rounded-l-md last:rounded-r-md odd:bg-neutral-700">
        {fifth}
      </h4>
    </div>
  );
};

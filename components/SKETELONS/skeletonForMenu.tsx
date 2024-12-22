export default function Skeleton() {
  return (
    <div>
      <div className="flex flex-col opacity-30">
        <div className="flex justify-between items-center">
          <button className="text-gray-800"></button>
        </div>
        <h1 className="text-2xl opacity-60 text-center p-12 font-semibold text-gray-700">
          <span className="text-green-600 font-bold block mt-2 animate-pulse">
            _____________________________________________________________________________________________________________________
          </span>
        </h1>

        <div className="flex justify-center">
          <div className="flex gap-8 opacity-60">
            <div className="rounded-full w-16 h-16 bg-green-500 animate-bounce flex justify-center items-center text-white"></div>
            <div className="rounded-full w-16 h-16 bg-green-500 animate-pulse flex justify-center items-center text-white"></div>
            <div className="rounded-full w-16 h-16 bg-green-500 animate-bounce flex justify-center items-center text-white"></div>
            <div className="rounded-full w-16 h-16 bg-green-500 animate-pulse flex justify-center items-center text-white"></div>
            <div className="rounded-full w-16 h-16 bg-green-500 animate-bounce flex justify-center items-center text-white"></div>
            <div className="rounded-full w-16 h-16 bg-green-500 animate-bounce flex justify-center items-center text-white"></div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 py-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="box-border bg-gray-300 w-full h-[270px] rounded-xl  flex items-center justify-center animate-pulse"
            >
              <h1 className="w-42 mt-3 rounded-md h-32 mx-auto py-6 bg-gray-800"></h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

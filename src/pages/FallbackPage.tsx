const FallbackPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-1">
      <div className="relative inline-flex">
        <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
        <div className="w-10 h-10 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-10 h-10 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
    </div>
  );
};
export default FallbackPage;

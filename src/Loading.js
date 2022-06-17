import { Spinner } from "flowbite-react";

const Loading = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Spinner size="xl" light={true} />
    </div>
  );
};

export default Loading;

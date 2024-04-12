import { Link } from "react-router-dom";
import { BiError } from "react-icons/bi";
import { buttonVariants } from "@/components/ui/button";

// interface SomethingWentWrongProps {
//   errorMessage: string;
// }

const SomethingWentWrong = () => {


  return (
  <main className="bg-zinc-50 h-screen flex items-center justify-center">
    <div className="w-[30%] bg-white flex flex-col items-center gap-2 rounded-sm shadow-sm px-2 py-5">
      <BiError className="h-8 w-8 text-red-500"/>
      <h1>Opps! Something went wrong</h1>
      <Link to="/" className={buttonVariants({variant:"default"})}>Back to home</Link>
    </div>
  </main>
  );
};

export default SomethingWentWrong;

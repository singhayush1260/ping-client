import { cn } from "@/lib/utils";
import { PiHandsClappingDuotone } from "react-icons/pi";


interface HeaderProps {
  label: string;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-3xl font-semibold flex items-center gap-x-1 text-blue-700")}> 
      <PiHandsClappingDuotone className="w-7 h-7"/>
      Ping</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
export default Header;
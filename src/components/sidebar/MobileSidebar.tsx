import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { CgMenuLeft } from "react-icons/cg";
import Sidebar from "./Sidebar";
const MobileSidebar = () => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger className="fixed top-4 left-4 z-[9]">
          <Button variant="outline" className="">
            <CgMenuLeft />
          </Button>
        </SheetTrigger>
        <SheetContent className="h-full  p-2" side="left">
          <Sidebar defaultValue="users" />
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default MobileSidebar;

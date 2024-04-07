import UsersMap from "@/components/map/UsersMap";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { CgMenuLeft } from "react-icons/cg";
import SideDrawer from "@/components/miscellaneous/SideDrawer";
import Sidebar from "@/components/sidebar/Sidebar";

const Home = () => {
  return (
    <main className="relative h-full w-full bg-coloredPattern p-1 md:p-3">
      <div className="fixed top-4 left-6 z-[9]">
        <SideDrawer side="left" trigger={<Button variant="outline"><CgMenuLeft /></Button>}>
          <Sidebar />
        </SideDrawer>
      </div>
      <Link to="/chats" className={cn(buttonVariants({ variant: "outline" }), "fixed top-4 left-20 z-[9]")}>Go to chats</Link>
      <UsersMap />
    </main>
  );
};

export default Home;

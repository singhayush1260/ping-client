import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface ChatInfoDrawerProps {
  trigger?: React.ReactNode;
  children: React.ReactNode;
  side?:"right"|"left"|"top"|"bottom";
}

const SideDrawer = ({ trigger, children, side }: ChatInfoDrawerProps) => {
  return (
    <Sheet>
      <SheetTrigger>{trigger}</SheetTrigger>
      <SheetContent className="h-full pt-10" side={side}>{children}</SheetContent>
    </Sheet>
  );
};

export default SideDrawer;

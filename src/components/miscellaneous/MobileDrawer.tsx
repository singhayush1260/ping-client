import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface MobileDrawerProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const MobileDrawer = ({ trigger, children }: MobileDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="">{children}</DrawerContent>
    </Drawer>
  );
};
export default MobileDrawer;

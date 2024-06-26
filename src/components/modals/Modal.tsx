import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  
  interface ModalProps {
    open?: boolean;
    setOpen?: (value: boolean) => void;
    trigger?: React.ReactNode;
    title?: string;
    children: React.ReactNode;
  }
  
  const Modal = ({ open,setOpen, trigger, title, children }: ModalProps) => {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger ? trigger : <span>Open Modal</span>}
        </DialogTrigger>
        <DialogContent className="w-[350px] md:w-[400px] rounded-md min-h-[250px]  flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-center">{title}</DialogTitle>
          </DialogHeader>
          {/* Apply flex-grow within a flex container */}
          <div className="flex-grow flex flex-col">
            {children}
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default Modal;
  
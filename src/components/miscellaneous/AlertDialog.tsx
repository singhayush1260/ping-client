import {
  AlertDialog as AlertDialogUI,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";


interface AlertDialogProps {
  children: React.ReactNode;
  title?: string;
  alertDiscription?: string;
  cancelButtonLabel?: string;
  cancelButtonAction: () => any;
  continueButtonLabel?: string;
  continueButtonAction: () => any;
  isDistructiveAction?: boolean;
}

const AlertDialog = ({
  children,
  title,
  alertDiscription,
  cancelButtonLabel,
  cancelButtonAction,
  continueButtonLabel,
  continueButtonAction,
  isDistructiveAction,
}: AlertDialogProps) => {
  return (
    <AlertDialogUI>
      <AlertDialogTrigger asChild>
        {children ? children : "Show Alert"}
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[250px] md:w-[420px] rounded-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title ? title : "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {`${
              alertDiscription
                ? alertDiscription
                : "This will permanently delete your data."
            }`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cancelButtonAction}>
            {cancelButtonLabel ? cancelButtonLabel : "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction
            className={cn(isDistructiveAction && "bg-destructive text-white")}
            onClick={continueButtonAction}
          >
            {continueButtonLabel ? continueButtonLabel : "Continue"}{" "}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogUI>
  );
};
export default AlertDialog;

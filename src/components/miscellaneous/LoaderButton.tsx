import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TbLoader2 } from "react-icons/tb";
interface LoaderButtonProps {
  variant?:"default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
  label: React.ReactNode | string;
  isLoading: boolean;
  loadingLabel?: React.ReactNode | string;
  type?: "submit" | "reset" | "button";
  className?: string;
  onClick?:()=>any;
}

const LoaderButton = ({
  variant,
  label,
  isLoading,
  loadingLabel,
  type,
  className,
  onClick
}: LoaderButtonProps) => {
  return (
    <Button type={type} variant={variant} disabled={isLoading} className={cn(isLoading && "cursor-not-allowed",className)} onClick={onClick}>
      {isLoading && <TbLoader2 className="animate-spin mr-1"/>}
      {isLoading ? (loadingLabel ? loadingLabel : "Loading") : label}
    </Button>
  );
};
export default LoaderButton;

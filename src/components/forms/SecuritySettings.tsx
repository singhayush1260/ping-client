import {useForm} from "react-hook-form";
import {useMutation} from "react-query"
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoaderButton from "@/components/miscellaneous/LoaderButton";
import { changePassword } from "@/api-client/auth-api";
import { UpdatePasswordSchema } from "./schemas";

const SecuritySettings=()=>{

  const {register,handleSubmit,formState:{errors}}=useForm({
    resolver:zodResolver(UpdatePasswordSchema),
    defaultValues:{
      currentPassword:"",
      newPassword:""
    }
  });

  const {mutate,isLoading,error,isSuccess}=useMutation(changePassword);

  const onSubmit=(data:{currentPassword:string,newPassword:string})=>{
   mutate(data);
  }

  return(
    <form  onSubmit={handleSubmit(onSubmit)}>
       <fieldset disabled={isLoading} className="w-full space-y-2">
       <div className="space-y-1 w-full">
        <Label>Current Password</Label>
        <Input type="password" placeholder="Enter current password" {...register("currentPassword")}/>
        <span className="text-sm font-light text-red-500">
          {/* @ts-ignore */}
          {errors.currentPassword?.message}
        </span>
        </div>
        <div className="space-y-1 w-full">
        <Label>New Password</Label>
        <Input type="password" placeholder="Enter new password" {...register("newPassword")}/>
        <span className="text-sm font-light text-red-500">
          {/* @ts-ignore */}
          {errors.newPassword?.message}
        </span>
        </div>
        <div className="flex items-center justify-between gap-2">
        {isSuccess && (
          <span className="text-sm font-light text-green-500">
            Password changed
          </span>
        )}
        <span className="text-sm font-light text-red-500">
          {/* @ts-ignore */}
          {error?.message}
        </span>
        <LoaderButton
          label="Save"
          isLoading={isLoading}
          loadingLabel="Saving"
        />
      </div>
       </fieldset>
    </form>
  )
}

export default SecuritySettings;
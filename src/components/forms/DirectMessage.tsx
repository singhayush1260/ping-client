import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactSelect from "react-select";
import Image from "@/components/miscellaneous/Image";
import { FcEditImage } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { CreateGroupSchema } from "@/components/forms/schemas";
import { useState } from "react";
  
interface CreateGroupProps{
    
}


  const DirectMessage= ({ }:CreateGroupProps) => {

    //  const[open,setOpen]=useState(false);

    const editThumbnailMenu = [
      {
        label: "Camera",
        onClick: () => {
          console.log("camera");
        },
      },
      {
        label: "Gallery",
        onClick: () => {
          console.log("gallery");
        },
      },
    ];
  
    const{register,handleSubmit,setValue, watch,formState:{errors}}=useForm({
      resolver:zodResolver(CreateGroupSchema)
    });

    const onSubmit=(data:any)=>{
    console.log("create group chat data",data);
    }

    return (
        <form className="flex flex-col items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full space-y-2">
            <Label>Search Connection</Label>
            <ReactSelect 
             classNames={{
              control:()=>"border-2",
              input:()=>"text-lg",
              option:()=>"text-lg"
            }}
            theme={(theme)=>({
              ...theme,
              borderRadius: 6,
              colors: {
                ...theme.colors,
                primary: 'black',
                primary25: '#ffe4e6'
              }
            })}
            options={[{label:"ayush",value:"ayush"}]}
            isMulti 
            />
            { errors?.members && <span className="text-sm font-light text-red-600">{String(errors?.members?.message)}</span>}
          </div>
          <div className="w-full space-y-2">
            <Label>Message</Label>
            <Input placeholder="Say hiii!"/>
            { errors?.members && <span className="text-sm font-light text-red-600">{String(errors?.members?.message)}</span>}
          </div>
          <div className="w-full mt-2">
            <Button disabled={false}>Send</Button>
          </div>
        </form>
    );
  };
  export default DirectMessage;
  
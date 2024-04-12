import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateGroup from "../forms/CreateGroup";
//import DirectMessage from "../forms/DirectMessage";
import Modal from "./Modal";


interface CreateChatProps {
  trigger?: React.ReactNode;
}

const CreateChat = ({ trigger }: CreateChatProps) => {

const[open,setOpen]=useState(false);

  return (
    <Modal trigger={trigger} open={open} setOpen={setOpen}>
      <Tabs defaultValue="group" className="w-full">
        <TabsList className="w-full my-3">
          {/* <TabsTrigger value="direct message" className="w-full">
            Direct Message
          </TabsTrigger> */}
          <TabsTrigger value="group" className="w-full">
            Group
          </TabsTrigger>
        </TabsList>
        {/* <TabsContent value="direct message">
          <DirectMessage />
        </TabsContent> */}
        <TabsContent value="group">
          <CreateGroup setOpen={setOpen}/>
        </TabsContent>
      </Tabs>
    </Modal>
  );
};
export default CreateChat;

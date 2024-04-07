import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateGroup from "../forms/CreateGroup";
//import DirectMessage from "../forms/DirectMessage";
import Modal from "./Modal";

interface CreateChatProps {
  trigger?: React.ReactNode;
}

const CreateChat = ({ trigger }: CreateChatProps) => {
  return (
    <Modal trigger={trigger}>
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
          <CreateGroup />
        </TabsContent>
      </Tabs>
    </Modal>
  );
};
export default CreateChat;

import { Tabs,TabsList,TabsTrigger,TabsContent } from "../ui/tabs";
import PersonalSettings from "../forms/ProfileSettings";
import SecuritySettings from "../forms/SecuritySettings";
import UserLocation from "../forms/UserLocation";
import Modal from "./Modal";

interface SettingsModalProps{
  trigger?:React.ReactNode;
}

const Settings = ({trigger}:SettingsModalProps) => {
  return (
    <Modal trigger={trigger ? trigger : <span>Settings</span>} title="Settings">
       <Tabs defaultValue="profile">
          <TabsList className="w-full">
            <TabsTrigger value="profile" className="w-full">Profile</TabsTrigger>
            <TabsTrigger value="location" className="w-full">Location</TabsTrigger>
            <TabsTrigger value="security" className="w-full">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
           <PersonalSettings/>
          </TabsContent>
          <TabsContent value="location">
           <UserLocation/>
          </TabsContent>
          <TabsContent value="security">
           <SecuritySettings/>
          </TabsContent>
        </Tabs>
    </Modal>
  );
};

export default Settings;

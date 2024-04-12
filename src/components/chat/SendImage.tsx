import {  useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Modal from "../modals/Modal";
import ImageInputButton, {
  ImageType,
} from "@/components/miscellaneous/ImageInputButton";
import { Button } from "../ui/button";
import Image from "@/components/miscellaneous/Image";
import { Input } from "../ui/input";
import { IoMdSend } from "react-icons/io";
import { useForm } from "react-hook-form";
import { sendImage } from "@/api-client/message-api";
import IMAGE_FALLBACK from "@/assets/image_fallback.png";
import LoaderButton from "../miscellaneous/LoaderButton";
import { socket } from "./MessageArea";
interface SendImageProps {
  trigger: React.ReactNode;
  chatId?: string;
  onSent: () => any;
}

const SendImage = ({ trigger, chatId = "", onSent }: SendImageProps) => {

  const queryClient = useQueryClient();

  const [image, setImage] = useState<ImageType>({
    file: null,
    preview: null,
  });

  const [openModal, setOpenModal] = useState(false);

  const { register, handleSubmit } = useForm();

  const { mutate, isLoading, error } = useMutation(sendImage, {
    onSuccess: async (sentImage) => {
      await onSent();
      setOpenModal(!openModal);
      socket.emit("new message",sentImage);
    },
  });

  const handleModalClose = () => {
    setImage({ file: null, preview: null });
    setOpenModal(!openModal);
  };

  const onSubmit = (data: any) => {
    if (!image.file && data?.caption?.length === 0) {
      return;
    }
    if (image) {
      const formData = new FormData();
      formData.append("chatId", chatId);
      formData.append("caption", data.caption);
      // @ts-ignore
      formData.append("image", image.file);
      mutate(formData);
    }
  };

  return (
    <Modal
      trigger={trigger}
      title="Select an image"
      open={openModal}
      setOpen={handleModalClose}
    >
      <form
        className="flex flex-col gap-2 p-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-center gap-4">
          <Button>Camera</Button>
          <ImageInputButton setImage={setImage}>
            <Button>Browse</Button>
          </ImageInputButton>
        </div>
        <div className="h-[200px]">
          {image && (
            <Image
              src={image?.preview || ""}
              fallback={IMAGE_FALLBACK}
              alt=""
              className="w-full h-full object-scale-down"
            />
          )}
        </div>
        <span className="text-sm font-light text-red-500">
          {/* @ts-ignore */}
          {error && String(error.message)}
        </span>
        <div className="flex gap-2">
          <Input
            placeholder="Enter caption"
            {...register("caption")}
            disabled={isLoading}
          />
          <LoaderButton
          variant="secondary"
            label={
              <IoMdSend size={30} className="text-gray-600 cursor-pointer" />
            }
            isLoading={isLoading}
            loadingLabel="Sending"
          />
        </div>
      </form>
    </Modal>
  );
};
export default SendImage;

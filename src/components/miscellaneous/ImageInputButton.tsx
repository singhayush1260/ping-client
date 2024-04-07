import  { useRef,ChangeEvent } from 'react';

export type ImageType={
  file:File |null;
  preview:string | null;
}

interface ImageInputButtonProps {
  children: React.ReactNode;
  value?:any;
  className?:string;
  setImage: (image:ImageType) => void;
}

const ImageInputButton = ({ children,value, setImage, className,...rest }:ImageInputButtonProps) => {

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files && e.target.files[0];
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setImage({ file: selectedImage, preview: imageUrl });
    }
  };

  const handleClick=()=>{
    inputRef.current?.click()
  }

  return (
    <div className={className} onClick={handleClick}>
      <label  className="cursor-pointer">{children}</label>
      <input
        type="file"
        accept="image/*"
        id="image"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
        {...rest}
      />
    </div>
  );
};

export default ImageInputButton;

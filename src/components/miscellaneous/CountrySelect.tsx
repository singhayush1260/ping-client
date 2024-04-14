import Select from "react-select";

import useCountries from "@/hooks/useCountries";
import { cn } from "@/lib/utils";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue |undefined;
  onChange: (value: CountrySelectValue) => void;
  isDisabled?:boolean;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange,isDisabled }) => {
  const { getAll } = useCountries();
  return (
    <div>
      <Select 
      classNames={{
        control:()=>"p-2 border-2",
      }}
      className={cn(isDisabled && "cursor-not-allowed")}
      theme={(theme)=>({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: '#3559E0',
          primary25: '#ffe4e6'
        }
      })}
      isDisabled={isDisabled}
      placeholder="Anywhere" 
      isClearable 
      options={getAll()} 
      value={value}
      onChange={(value)=>onChange(value as CountrySelectValue)}
      formatOptionLabel={(option:any)=>{
        return <div className="flex flex-row items-center gap-3">
          <div>{option.flag}</div>
          <div>
            {option.label},
            <span className="text-neutral-500 ml-1">
             {option.region}
            </span>
          </div>
        </div>
      }}
      />
    </div>
  );
};
export default CountrySelect;
import Select from "react-select";
import useCountries from "@/hooks/useCountries";

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
      styles={{option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white' : 'blue',
        padding: 5,
      }),}}
   
      
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
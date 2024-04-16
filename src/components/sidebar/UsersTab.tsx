import { useSidebarContext } from "@/context/SidebarContext";
import { cn } from "@/lib/utils";
import ReactSelect from "react-select";
import CountrySelect from "@/components/miscellaneous/CountrySelect";

const UsersTab = () => {
  const { filter, setFilter } = useSidebarContext();
  return (
    <div className="h-full flex flex-col gap-3 p-2">
      <div>
        <h5 className="text-sm text-gray-800 dark:text-white font-light mb-1">Show</h5>
        <ReactSelect
        styles={{option: (provided, state) => ({
          ...provided,
          color: state.isSelected ? 'white' : 'blue',
          padding: 5,
        }),}}
          value={{ label: filter.filterType, value: filter.filterType }}
          options={[
            { label: "ALL USERS", value: "ALL USERS" },
            { label: "CONNECTIONS", value: "CONNECTIONS" },
            { label: "BY COUNTRY", value: "BY COUNTRY" },
          ]}
          isSearchable={false}
          onChange={(filter) =>
            setFilter({ filterType: filter?.value, filterPayload: undefined })
          }
        />
      </div>
      {filter.filterType === "BY COUNTRY" && (
        <div>
          <h5
            className={cn(
              filter.filterType !== "BY COUNTRY" && "cursor-not-allowed",
              "text-sm text-gray-800 dark:text-white font-light mb-1"
            )}
          >
            Search by country
          </h5>
          <CountrySelect
            isDisabled={filter.filterType !== "BY COUNTRY"}
            onChange={(country) =>
              setFilter({
                filterType: "BY COUNTRY",
                filterPayload: country.label,
              })
            }
          />
        </div>
      )}
    </div>
  );
};
export default UsersTab;

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ISelectBox {
  className?: string;
  containerClassName?: string;
  defaultValue?: string | number | undefined;
  id: string;
  value: string | number;
  optionsList: { value: string | number; content: string }[];
  translateFunction?: (key: string) => string;
  onChange: (value: string) => void;
  placeholder: string;
}

const SelectBox: React.FC<ISelectBox> = ({ containerClassName, className, defaultValue, id, value, optionsList, translateFunction, onChange, placeholder }) => (
  <div className={containerClassName}>
    <Select
      onValueChange={onChange}
      defaultValue={defaultValue}
      id={id}
      value={value}
    >
      <SelectTrigger className={`h-14 ${className}`}>
        <SelectValue placeholder={translateFunction ? translateFunction(placeholder) : placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {optionsList?.map((option, index) => (
            <SelectItem
              key={index}
              value={option.value}
            >
              {translateFunction ? translateFunction(option.content) : option.content}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);

export default SelectBox;

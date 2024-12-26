const ShoppingList: React.FC<{ id: string, label: string, checked: boolean, onChange: (id: string) => void }> = ({ id, label, onChange, checked }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      id={id}
      name={id}
      checked={checked}
      onChange={() => onChange(id)}
      className={`
                  peer relative m-0 mr-4 grid size-4 cursor-pointer appearance-none items-center border-none outline-none before:absolute
                  before:right-[60%] before:top-auto before:h-[2px] before:w-0 before:origin-[right_bottom] before:rounded-sm before:bg-tra-primary-focused before:content-[""] after:absolute
                  after:left-[40%] after:top-auto after:h-[2px] after:w-0 after:origin-left after:rounded-sm after:bg-tra-primary-focused after:content-[""] checked:animate-move
                  checked:text-tra-neutral checked:before:animate-check01 checked:after:animate-check02`}
    />
    <label
      htmlFor={id}
      className={`relative mr-5 grid w-fit animate-move cursor-pointer select-none items-center rounded-full text-tra-neutral-black transition-all duration-300
                  ease-in before:absolute before:-left-7 before:h-[2px] before:w-2 before:rounded-sm before:bg-tra-primary-focused before:transition-all before:duration-300 before:ease-in 
                  before:content-[""] after:absolute after:-left-6 after:top-2 after:size-1 after:content-[""] peer-checked:text-tra-neutral
                  peer-checked:before:animate-slice peer-checked:before:bg-tra-neutral peer-checked:after:animate-firework`}
    >
      {label}
    </label>
  </div>
);

export default ShoppingList;

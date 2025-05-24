import { NumberField } from '@base-ui-components/react/number-field';
import { IconProxy } from '@components/Customization/IconProxy.js';

export const NumberInput = (
  {inputPlaceholder, className: oriClassName, ...restProps}: NumberField.Root.Props & 
  {
    inputPlaceholder?: string
  }
) => {
  return (
    <NumberField.Root
      {...restProps}
      className={`${oriClassName? oriClassName: ""} flex flex-col items-start gap-1`}
    >
      <NumberField.Group className="flex">
        <NumberField.Decrement className="flex size-10 items-center justify-center rounded-tl-md rounded-bl-md border border-gray-200 bg-gray-50 bg-clip-padding text-gray-900 select-none hover:bg-gray-100 active:bg-gray-100">
          <IconProxy fontSize="small" iconName="Minus" />
        </NumberField.Decrement>
        <NumberField.Input placeholder={inputPlaceholder} className="h-10 w-24 border-t border-b border-gray-200 text-center text-base text-gray-900 tabular-nums focus:z-1 focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800" />
        <NumberField.Increment className="flex size-10 items-center justify-center rounded-tr-md rounded-br-md border border-gray-200 bg-gray-50 bg-clip-padding text-gray-900 select-none hover:bg-gray-100 active:bg-gray-100">
          <IconProxy fontSize="small" iconName="Add" />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}

export default NumberInput;
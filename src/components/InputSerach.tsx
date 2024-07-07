import { InputSearchProps } from "../interface/interface";
import { Input } from "./ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const InputSerach = ({
  searchWord,
  handleWordChange,
  handleKeyPress,
}: InputSearchProps) => {
  return (
    <TooltipProvider>
      <div className="flex items-center justify-center">
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Input
              type="text"
              placeholder="Search word like qui, sunt, dolorem etc"
              className={`w-[500px] focus-visible:border-b-2 ${
                searchWord && searchWord.length < 3 && "border-red-700"
              }`}
              value={searchWord}
              onChange={handleWordChange}
              onKeyDown={handleKeyPress}
            />
          </TooltipTrigger>
          <TooltipContent>
            {
              searchWord.length < 2 && (
                <section className="p-2">
                <p className="font-medium text-sm tracking-wide">
                  Type at least 3 words
                </p>
  
                <p className="font-normal text-xs tracking-normal">
                  to start searching
                </p>
              </section>
              ) 
            }
          
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default InputSerach;

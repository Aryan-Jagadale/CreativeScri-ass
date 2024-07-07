import { Button } from "./ui/button";
import { Loader2 } from "lucide-react"; 

import { LoadMoreButtonProps } from "../interface/interface";

const LoadMoreButton = ({isLoading,onClick}:LoadMoreButtonProps) => {
  return (
    <div className="flex items-center justify-center">
    <Button onClick={onClick}>
      {
        isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      }
      Load more
      </Button>
  </div>
  )
}

export default LoadMoreButton
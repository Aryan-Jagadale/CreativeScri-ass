import { ChangeEvent, KeyboardEvent } from "react";
export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

  export interface DataViewerProps {
    data: Post[];
  }
  export interface LoadMoreButtonProps {
    isLoading: boolean;
    onClick: () => void;
  }

  export interface InputSearchProps {
    searchWord: string;
    handleWordChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
  }
  
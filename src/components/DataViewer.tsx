import { Signature } from "lucide-react";
import { Post, DataViewerProps } from "../interface/interface";

const DataViewer = ({ data }: DataViewerProps) => {
  return (
    <div className="flex items-center flex-col mt-5 mb-5 px-4 sm:px-6 lg:px-8">
      <div className="w-full sm:w-[600px] md:w-[700px] max-h-[50vh] md:max-h-[70vh] border border-gray-300 overflow-y-auto">
        {(!data || data.length === 0) && (
          <div className="h-[180px] flex items-center justify-center font-medium text-sm">
            <span>No results</span>
          </div>
        )}
        {data &&
          data.map((item: Post) => {
            return (
              <div
                key={item.id}
                className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded"
              >
                <Signature className="h-4 w-4" />
                <span className="select-none text-sm capitalize">
                  {item.title}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DataViewer;

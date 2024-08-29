import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPrevious, onNext }) => (
  <div className="flex justify-center mt-4 space-x-2">
    <Button
      variant="outline"
      size="icon"
      onClick={onPrevious}
      disabled={currentPage === 1}
    >
      <ChevronLeftIcon className="h-4 w-4" />
    </Button>
    <Button
      variant="outline"
      size="icon"
      onClick={onNext}
      disabled={currentPage === totalPages}
    >
      <ChevronRightIcon className="h-4 w-4" />
    </Button>
    {/* <p className="text-center mt-2">
      Halaman {currentPage} dari {totalPages}
    </p> */}
  </div>
);

export default Pagination;

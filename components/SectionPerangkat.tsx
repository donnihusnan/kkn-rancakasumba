import Section from './Section';
import TabelPerangkatDesa from './TabelPerangkatDesa';
import Pagination from './Pagination';
import { useState } from 'react';

const SectionPerangkat = ({ perangkatDesa }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(perangkatDesa.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = perangkatDesa.slice(startIndex, endIndex);

  return (
    <Section id="perangkat" title="Perangkat Desa">
      <TabelPerangkatDesa perangkatDesa={currentPageData} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      />
    </Section>
  );
};

export default SectionPerangkat;

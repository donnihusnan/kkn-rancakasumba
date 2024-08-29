import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface PerangkatDesa {
  jabatan: string;
  nama: string;
  alamat: string;
}

interface TabelPerangkatDesaProps {
  perangkatDesa: PerangkatDesa[];
}

const TabelPerangkatDesa: React.FC<TabelPerangkatDesaProps> = ({
  perangkatDesa,
}) => (
  <Table>
    <TableHeader>
      <TableRow className="pl-20">
        <TableHead className="text-center">JABATAN</TableHead>
        <TableHead className="text-center">NAMA</TableHead>
        <TableHead className="text-center">ALAMAT</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {perangkatDesa.map((perangkat, index) => (
        <TableRow key={index}>
          <TableCell>{perangkat.jabatan}</TableCell>
          <TableCell>{perangkat.nama}</TableCell>
          <TableCell>{perangkat.alamat}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default TabelPerangkatDesa;

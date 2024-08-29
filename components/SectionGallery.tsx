import Section from './Section';
import Gallery from './Gallery';

interface SectionGalleryProps {
  galleryImages: string[];
}

const SectionGallery: React.FC<SectionGalleryProps> = ({ galleryImages }) => (
  <Section id="galeri" title="Gallery">
    <Gallery images={galleryImages} />
  </Section>
);

export default SectionGallery;

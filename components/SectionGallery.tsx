import Section from './Section';
import Gallery from './Gallery';

const SectionGallery = ({ galleryImages }) => (
  <Section id="galeri" title="Gallery">
    <Gallery images={galleryImages} />
  </Section>
);

export default SectionGallery;

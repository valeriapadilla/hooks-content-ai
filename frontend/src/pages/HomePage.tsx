import { Box } from '@mui/material';
import {
  Navbar,
  HeroSection,
  TestimonialSection,
  HowItWorksSection,
  FeaturesSection,
  Footer,
} from '../components/marketing';

const HomePage = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        position: 'relative',
      }}
    >
      <Navbar onNavigate={scrollToSection} />
      <Box component="main">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;

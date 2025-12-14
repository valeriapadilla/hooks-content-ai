import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
  Divider,
  IconButton,
} from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

const footerLinks = {
  producto: [
    { label: 'Características', href: '#features' },
    { label: 'Precios', href: '#pricing' },
    { label: 'Integraciones', href: '#' },
    { label: 'Changelog', href: '#' },
  ],
  recursos: [
    { label: 'Blog', href: '#' },
    { label: 'Guías', href: '#' },
    { label: 'Centro de Ayuda', href: '#' },
    { label: 'Comunidad', href: '#' },
  ],
  empresa: [
    { label: 'Acerca de', href: '#' },
    { label: 'Carreras', href: '#' },
    { label: 'Contacto', href: '#' },
    { label: 'Partners', href: '#' },
  ],
  legal: [
    { label: 'Privacidad', href: '#' },
    { label: 'Términos', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
};

const socialLinks = [
  { icon: <TwitterIcon />, href: 'https://twitter.com' },
  { icon: <InstagramIcon />, href: 'https://instagram.com' },
  { icon: <LinkedInIcon />, href: 'https://linkedin.com' },
  { icon: <YouTubeIcon />, href: 'https://youtube.com' },
];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 8, md: 10 },
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(17, 17, 17, 0.5)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 6,
          }}
        >
          {/* Logo & Description */}
          <Box sx={{ flex: { xs: 1, md: '0 0 33%' } }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mb: 2,
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              <Box
                component="img"
                src="/logo.png"
                alt="HooksContent Logo"
                sx={{
                  width: 36,
                  height: 36,
                  objectFit: 'contain',
                }}
              />
              <Typography variant="h6" fontWeight={700}>
                Hooks<span style={{ color: '#FFCE45' }}>Content</span>
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, maxWidth: 280 }}
            >
              Aprende a crear contenido viral con el poder de la IA. 
              Analiza, predice y mejora tus videos para máximo impacto.
            </Typography>
            <Stack direction="row" spacing={1}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      background: 'rgba(59, 130, 246, 0.1)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Box>

          {/* Links */}
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
                gap: 4,
              }}
            >
              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  sx={{ mb: 2 }}
                >
                  Producto
                </Typography>
                <Stack spacing={1.5}>
                  {footerLinks.producto.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      color="text.secondary"
                      sx={{
                        fontSize: '0.875rem',
                        transition: 'color 0.2s',
                        '&:hover': { color: 'text.primary' },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  sx={{ mb: 2 }}
                >
                  Recursos
                </Typography>
                <Stack spacing={1.5}>
                  {footerLinks.recursos.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      color="text.secondary"
                      sx={{
                        fontSize: '0.875rem',
                        transition: 'color 0.2s',
                        '&:hover': { color: 'text.primary' },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  sx={{ mb: 2 }}
                >
                  Empresa
                </Typography>
                <Stack spacing={1.5}>
                  {footerLinks.empresa.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      color="text.secondary"
                      sx={{
                        fontSize: '0.875rem',
                        transition: 'color 0.2s',
                        '&:hover': { color: 'text.primary' },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  sx={{ mb: 2 }}
                >
                  Legal
                </Typography>
                <Stack spacing={1.5}>
                  {footerLinks.legal.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      color="text.secondary"
                      sx={{
                        fontSize: '0.875rem',
                        transition: 'color 0.2s',
                        '&:hover': { color: 'text.primary' },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 6, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Bottom Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} HooksContent. Todos los derechos reservados.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link href="#" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
              Política de Privacidad
            </Link>
            <Link href="#" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
              Términos de Servicio
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

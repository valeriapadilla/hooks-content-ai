import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface NavbarProps {
  onNavigate?: (section: string) => void;
}

const NAV_ITEMS = [
  { id: 'features', label: 'Características' },
  { id: 'pricing', label: 'Precios' },
  { id: 'blog', label: 'Blog' },
  { id: 'about', label: 'Acerca de' },
  { id: 'contact', label: 'Contacto' },
];

const Navbar = ({ onNavigate }: NavbarProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  const handleLogin = () => {
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const handleSignup = () => {
    setMobileMenuOpen(false);
    navigate('/signup');
  };

  return (
    <AppBar position="fixed" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 64, md: 72 },
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
            onClick={() => navigate('/')}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="HooksContent Logo"
              sx={{
                width: 38,
                height: 38,
                objectFit: 'contain',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.02em',
                fontSize: '1.25rem',
                color: 'text.primary',
              }}
            >
              Hooks<span style={{ color: '#FFCE45' }}>Content</span>
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              {NAV_ITEMS.map((item) => (
                <Typography
                  key={item.id}
                  component="button"
                  onClick={() => handleNavClick(item.id)}
                  sx={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'text.secondary',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    transition: 'color 0.2s',
                    '&:hover': {
                      color: '#FFCE45',
                    },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>
          )}

          {/* Desktop Auth Buttons */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                onClick={handleLogin}
                sx={{
                  color: 'text.primary',
                  fontWeight: 500,
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                Iniciar sesión
                <Box
                  component="span"
                  sx={{
                    ml: 0.5,
                    display: 'inline-flex',
                    transform: 'rotate(-45deg)',
                  }}
                >
                  →
                </Box>
              </Button>
              <Button
                variant="contained"
                onClick={handleSignup}
                sx={{
                  px: 3,
                  py: 1,
                }}
              >
                Registrarse
              </Button>
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              onClick={() => setMobileMenuOpen(true)}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Mobile Drawer */}
          <Drawer
            anchor="right"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            PaperProps={{
              sx: {
                width: '100%',
                maxWidth: 320,
                background: 'rgba(10, 10, 10, 0.95)',
                backdropFilter: 'blur(20px)',
              },
            }}
          >
            <Box sx={{ p: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 4,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Hooks<span style={{ color: '#FFCE45' }}>Content</span>
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => setMobileMenuOpen(false)}
                  sx={{ color: 'text.primary' }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              <List>
                {NAV_ITEMS.map((item) => (
                  <ListItem key={item.id} disablePadding>
                    <ListItemButton
                      onClick={() => handleNavClick(item.id)}
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.05)',
                        },
                      }}
                    >
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontWeight: 500,
                          color: 'text.secondary',
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>

              <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleLogin}
                  sx={{ py: 1.5 }}
                >
                  Iniciar sesión
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSignup}
                  sx={{ py: 1.5 }}
                >
                  Registrarse
                </Button>
              </Box>
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;


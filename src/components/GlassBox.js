import { useContext } from 'react';
import AppContext from '../provider/appContext';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const GlassBox = ({ children, sx = [] }) => {
  const theme = useTheme();
  const {
    app: { isDark },
  } = useContext(AppContext);

  return (
    <Box
      mt={{ xs: 10, sm: 12 }}
      p={{ xs: 2.5, sm: 5 }}
      sx={[
        {
          borderRadius: { xs: '20px', sm: '40px' },
          border: `${isDark ? '' : `1px solid ${theme.palette.primary.white + '50'}`}`,
          backgroundColor: `${isDark ? theme.palette.primary.darkPurple + '70' : theme.palette.primary.white + '60'} `,
          backdropFilter: 'blur(10px)',
          height: '100%',
          boxShadow: `0 4px 30px rgba(0, 0, 0, 0.1)`,
        },
        ...(Array.isArray(sx) ? sx : [sx]), // spread in case it's an array
      ]}
    >
      {children}
    </Box>
  );
};

export default GlassBox;

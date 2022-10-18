import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Sidebar from './sidebar';

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const PlayerLayout = ({ children }: Props) => {
  return (
    <Box width="100vw" height="100vh">
      <Box
        position="absolute"
        top="0"
        left="0"
        width="250px"
        // style={{ backgroundColor: 'green' }}
      >
        <Sidebar />
      </Box>
      <Box marginLeft="250px" marginBottom="100px">
        <Box height="calc(100vh - 100px)">{children}</Box>
      </Box>
      <Box
        position="absolute"
        left="0"
        bottom="0"
        width="100vw"
        height="100px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        style={{ backgroundColor: 'red' }}
      >
        <div>Player Bar</div>
        <footer>
          App logo from <a href="https://www.vecteezy.com/">Vecteezy.com</a>
        </footer>
      </Box>
    </Box>
  );
};

export default PlayerLayout;

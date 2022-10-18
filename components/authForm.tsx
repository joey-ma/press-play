import { Box, Flex, Input, Button, FormLabel } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useSWRConfig } from 'swr';
import { auth } from '../lib/mutations';
import NextImage from 'next/image';

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const modeText = mode === 'signin' ? 'Sign In' : 'Sign Up';

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    await auth(mode, { email, password });
    if (process.env.NODE === 'development')
      console.log(
        '🚀 ~ file: authForm.tsx ~ line 23 ~ handleSubmit ~ mode, email, password:',
        mode,
        email,
        password
      );

    setIsLoading(false);
    router.push('/');
  };

  return (
    <Box height="100vh" width="100vw" bg="black">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="lightgray 1px solid"
      >
        <Box
          id="app-logo"
          color="gray.400"
          fontWeight={600}
          fontSize={36}
          display="flex"
          alignItems="center"
          gap={5}
          paddingX="25px"
        >
          Player for Life
          <NextImage
            src="/playground-svg.svg"
            style={{
              filter:
                // close enough to gray.400,
                // without bringing in `npm install --save-dev babel-plugin-inline-react-svg` just for this
                'invert(72%) sepia(0%) saturate(372%) hue-rotate(145deg) brightness(100%) contrast(95%)',
            }}
            height={60}
            width={60}
          />
        </Box>
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <FormLabel
              color="gray.400"
              display="flex"
              fontSize="24"
              marginBottom="10px"
              justifyContent="center"
            >
              {modeText}
            </FormLabel>
            <FormLabel color="gray.400">Email</FormLabel>
            <Input
              color="gray.400"
              marginBottom="10px"
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel color="gray.400">Password</FormLabel>
            <Input
              color="gray.400"
              marginBottom="10px"
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              marginTop="10px"
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              sx={{
                '&:hover': {
                  bg: 'green.300',
                },
              }}
            >
              {modeText}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;

// * Binding element 'mode' implicitly has an 'any' type.
// export default function AuthForm({ mode }): FC<{ mode: 'signin' | 'signup' }> {
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setIsLoading(true);

//     await auth(mode, { email, password });
//     setIsLoading(false);
//     router.push('/');
//   };

//   return (
//     <Box height="100vh" width="100vw" bg="black">
//       <Flex
//         justify="center"
//         align="center"
//         height="100px"
//         borderBottom="white 1px solid"
//       >
//         <NextImage src="/playground-svg.svg" height={60} width={120} />
//       </Flex>
//       <Flex justify="center" align="center" height="calc(100vh - 100px)">
//         <Box padding="50px" bg="gray.900" borderRadius="6px">
//           <form onSubmit={handleSubmit}>
//             <Input
//               marginBottom="10px"
//               placeholder="email"
//               type="email"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <Input
//               marginY="10px"
//               placeholder="password"
//               type="password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <Button
//               marginTop="10px"
//               type="submit"
//               bg="green.500"
//               isLoading={isLoading}
//               sx={{
//                 '&:hover': {
//                   bg: 'green.300',
//                 },
//               }}
//             >
//               {mode === 'signin' ? 'Sign In' : 'Sign Up'}
//             </Button>
//           </form>
//         </Box>
//       </Flex>
//     </Box>
//   );
// }

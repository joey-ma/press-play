import { Box, Flex, Input, Button, FormLabel } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useState, useRef, useEffect } from 'react';
import { useSWRConfig } from 'swr';
import { auth } from '../lib/mutations';
import NextImage from 'next/image';

const AuthForm: FC<{
  mode: 'signin' | 'signup';
}> = ({ mode }) => {
  // useRef for no re-rendering when user typing email / password
  // const emailRef = useRef();
  // const passwordRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingSignin, setLoadingSignin] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const altButtonStatus = mode === 'signin' ? loadingSignup : loadingSignin;
  const router = useRouter();

  // if (process.env.NODE_ENV === 'development') {
  //   console.log('mode:', mode);
  //   console.log('loadingSignup:', loadingSignup);
  // }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (mode === 'signin') setLoadingSignin(true);
    if (mode === 'signup') setLoadingSignup(true);

    const access = await auth(mode, { email, password });

    const { id } = access;
    if (id) router.push('/');

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `🚀 -> file: authForm.tsx -> line 28 -> handleSubmit -> access:`,
        access
      );

      console.log(
        '🚀 ~ file: authForm.tsx ~ line 23 ~ handleSubmit ~ mode, email, password:\n',
        mode,
        email,
        // emailRef.current.value,
        password
        // passwordRef.current.value
      );
    }

    if (access.error !== undefined) {
      setStatusMessage(`${access.status}: ${access.statusMessage}`);
    }

    if (mode === 'signin') setLoadingSignin(false);
    if (mode === 'signup') setLoadingSignup(false);
  };

  return (
    <Box height="100vh" width="100vw" bg="black">
      <Flex
        id="app-header"
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
      <Flex
        id="auth-form-container"
        justify="center"
        align="center"
        height="calc(100vh - 150px)"
      >
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form
            onSubmit={handleSubmit}
            style={{ height: '300px', width: '300px' }}
          >
            <FormLabel
              color="gray.400"
              display="flex"
              fontSize="24"
              marginBottom="10px"
              justifyContent="center"
            >
              {mode === 'signin' ? 'Sign in' : 'Sign up'}
            </FormLabel>
            <FormLabel color="gray.400">Email</FormLabel>
            <Input
              color="gray.400"
              marginBottom="10px"
              placeholder="email"
              // ref={emailRef}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel color="gray.400">Password</FormLabel>
            <Input
              color="gray.400"
              marginBottom="10px"
              placeholder="password"
              // ref={passwordRef}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Flex justifyContent="space-between">
              {/* Main Button */}
              <Button
                type="submit"
                bg="green.500"
                isLoading={mode === 'signin' ? loadingSignin : loadingSignup}
                marginTop="10px"
                sx={{
                  '&:hover': {
                    bg: 'green.300',
                  },
                }}
                width="6em"
              >
                {mode === 'signin' ? 'Sign in' : 'Sign up'}
              </Button>
              {/* Alt Button */}
              <Button
                type="button"
                bg="green.500"
                isLoading={altButtonStatus}
                marginTop="10px"
                sx={{
                  '&:hover': {
                    bg: 'green.300',
                  },
                }}
                width="6em"
                onClick={(e) => {
                  e.preventDefault();
                  if (mode === 'signin') {
                    setLoadingSignup(true);
                    router.push('/signup');
                  }
                  if (mode === 'signup') {
                    setLoadingSignin(true);
                    router.push('/signin');
                  }
                }}
              >
                {mode !== 'signin' ? 'Sign in' : 'Sign up'}
              </Button>
            </Flex>
            {/* signin status for user */}
            {statusMessage ? (
              <Box marginTop="1em" color="crimson">
                {statusMessage}
              </Box>
            ) : null}
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;

// * Binding element 'mode' implicitly has an 'any' type.
/*  notes TypeScript syntax only
    (for traditional export default function)
export default function AuthForm1({
  mode = 'signin',
}): FC<{ mode: 'signin' | 'signup' }> {
  const log = `Type 'Element' is not assignable to type 'FC<{ mode: "signin" | "signup"; }>'.
  Type 'ReactElement<any, any>' provides no match for the signature '(props: { mode: "signin" | "signup"; }, context?: any): ReactElement<any, any> | null'.`
  return <div>Notes only</div>;
} */

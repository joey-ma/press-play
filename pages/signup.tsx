import type { NextPage } from 'next';
import AuthForm from '../components/authForm';

const Signup: NextPage = () => {
  return <AuthForm mode="signup" />;
};

Signup.authPage = true;

export default Signup;

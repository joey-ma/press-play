import type { NextPage } from 'next';
import AuthForm from '../components/authForm';

const Signup: NextPage = () => <AuthForm mode="signup" />;

Signup.authPage = true;

export default Signup;

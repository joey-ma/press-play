import type { NextPage } from 'next';
import AuthForm from '../components/authForm';

const Signin: NextPage = () => <AuthForm mode="signin" />;

Signin.authPage = true;

export default Signin;

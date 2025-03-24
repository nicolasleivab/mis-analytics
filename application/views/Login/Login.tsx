import { TextInput, PasswordInput, Group, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from '../../controller/Router/routes';
import * as styles from './Login.module.css';
import { useEffect } from 'react';
import {
  authenticateUser,
  selectUser,
  setGuestUser,
  useAppDispatch,
  useAppSelector,
} from '../../../model';
import { CustomButton, CustomCard } from '../../../presentation/components';
import { verifyUser } from '../../../model/User/userThunks';

type LoginFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const isLoading = false;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value: string) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email',
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    const { email, password } = values;

    try {
      await dispatch(authenticateUser({ email, password }));
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  const handleGuestLogin = () => {
    dispatch(setGuestUser());
    navigate(HOME_ROUTE);
  };

  useEffect(() => {
    if (user) {
      navigate(HOME_ROUTE);
    }
  }, [user, navigate]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        await dispatch(verifyUser());
      } catch (error) {
        console.warn('User needs to login');
      }
    };
    void checkUser();
  }, [dispatch, navigate]);

  return (
    <div className={styles.LoginWrapper}>
      <div className={styles.LeftImage}></div>

      <div className={styles.RightForm}>
        <h1 style={{ textAlign: 'center', fontSize: '32px' }}>Welcome back</h1>
        <CustomCard>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.onSubmit(handleSubmit)();
            }}
          >
            <Flex direction="column" gap="xl" style={{ marginTop: 24 }}>
              <TextInput
                label="Email"
                placeholder="you@example.com"
                required
                size="md"
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                style={{ marginTop: 16 }}
                size="md"
                {...form.getInputProps('password')}
              />
              <Group style={{ marginTop: 24 }}>
                <CustomButton type="submit" loading={isLoading}>
                  Login
                </CustomButton>
                <CustomButton
                  variant="secondary"
                  type="button"
                  onClick={handleGuestLogin}
                  loading={isLoading}
                >
                  Login as Guest
                </CustomButton>
                {/* <CustomButton variant="secondary">Login as Guest</CustomButton> */}
              </Group>
              <Flex gap="sm" style={{ marginTop: 32 }}>
                <p>No account?</p>
                <Link className={styles.Link} to="/register">
                  Create one!
                </Link>
              </Flex>
            </Flex>
          </form>
        </CustomCard>
      </div>
    </div>
  );
}

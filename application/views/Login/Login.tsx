import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from '../../controller/Router/routes';
import * as styles from './Login.module.css';
import { FormEventHandler, useEffect } from 'react';
import {
  authenticateUser,
  selectUser,
  useAppDispatch,
  useAppSelector,
} from '../../../model';

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
      // password: (value: string) => {
      //   return value.length < 6
      //     ? 'Password must be at least 6 characters'
      //     : null;
      // },
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

  const typedForm = form as unknown as {
    onSubmit: (
      callback: (values: LoginFormValues) => void
    ) => FormEventHandler<HTMLFormElement> | undefined;
    getInputProps: (key: keyof LoginFormValues) => {
      value: string;
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
      onBlur: () => void;
      error: string | null;
    };
  };

  useEffect(() => {
    if (user) {
      navigate(HOME_ROUTE);
    }
  }, [user, navigate]);

  return (
    <div className={styles.Login}>
      <Container size={420} style={{ marginTop: 40 }} className={styles.Login}>
        <Title
          style={{
            textAlign: 'center',
            fontWeight: 900,
          }}
        >
          Welcome back
        </Title>

        <Paper
          withBorder
          shadow="md"
          p={30}
          style={{ marginTop: 30 }}
          radius="md"
        >
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={typedForm.onSubmit(handleSubmit)}>
            <TextInput
              label="Email"
              placeholder="you@example.com"
              required
              size="md"
              {...typedForm.getInputProps('email')}
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              style={{ marginTop: 16 }}
              size="md"
              {...typedForm.getInputProps('password')}
            />

            <Group
              style={{
                marginTop: 24,
                display: 'flex',
              }}
            >
              <Button
                type="submit"
                size="md"
                loading={isLoading}
                loaderProps={{ type: 'dots' }}
              >
                Login
              </Button>
              <Button variant="outline" size="md">
                Login as Guest
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

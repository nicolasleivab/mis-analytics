import {
  TextInput,
  PasswordInput,
  Paper,
  Container,
  Group,
  Flex,
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
import { CustomButton, CustomCard } from '../../../presentation/components';

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
    <div className={styles.LoginWrapper}>
      <div className={styles.LeftImage}></div>

      <div className={styles.RightForm}>
        <h1 style={{ textAlign: 'center', fontSize: '32px' }}>Welcome back</h1>
        <CustomCard>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={typedForm.onSubmit(handleSubmit)}>
            <Flex direction="column" gap="xl" style={{ marginTop: 24 }}>
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
              <Group style={{ marginTop: 24 }}>
                <CustomButton
                  type="submit"
                  loading={isLoading}
                  // loaderProps={{ type: 'dots' }}
                >
                  Login
                </CustomButton>
                <CustomButton variant="secondary">Login as Guest</CustomButton>
              </Group>
            </Flex>
          </form>
        </CustomCard>
      </div>
    </div>
  );
}

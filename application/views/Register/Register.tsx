import { TextInput, PasswordInput, Group, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from '../../controller/Router/routes';
import * as styles from './Register.module.css';
import { FormEventHandler, useEffect } from 'react';
import {
  registerUser,
  selectUser,
  useAppDispatch,
  useAppSelector,
} from '../../../model';
import { CustomButton, CustomCard } from '../../../presentation/components';

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const navigate = useNavigate();
  const { user, error, isLoading } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const form = useForm<RegisterFormValues>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email'),

      password: (value) =>
        value.length < 12 ? 'Password must be at least 6 characters' : null,

      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
    },
  });

  // 2. Convert to typed form if needed
  const typedForm = form as unknown as {
    onSubmit: (
      callback: (values: RegisterFormValues) => void
    ) => FormEventHandler<HTMLFormElement> | undefined;
    getInputProps: (key: keyof RegisterFormValues) => {
      value: string;
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
      onBlur: () => void;
      error: string | null;
    };
  };

  // 3. Submit handler calls the register thunk
  const handleSubmit = async (values: RegisterFormValues) => {
    const { email, password } = values;

    try {
      await dispatch(registerUser({ email, password }));
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  useEffect(() => {
    // If user is logged in after registration, redirect
    if (user) {
      navigate(HOME_ROUTE);
    }
  }, [user, navigate]);

  return (
    <div className={styles.RegisterWrapper}>
      <div className={styles.LeftImage}></div>

      <div className={styles.RightForm}>
        <h1 style={{ textAlign: 'center', fontSize: '32px' }}>
          Create Account
        </h1>

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
                size="md"
                {...typedForm.getInputProps('password')}
              />

              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm your password"
                required
                size="md"
                {...typedForm.getInputProps('confirmPassword')}
              />
              <Group style={{ marginTop: 24 }}>
                <p>Password needs to be at least 12 characters long.</p>
              </Group>

              <Group style={{ marginTop: 24 }}>
                <CustomButton type="submit" loading={isLoading}>
                  Register
                </CustomButton>
              </Group>

              <Flex gap="sm" style={{ marginTop: 32 }}>
                <p>Already have an account?</p>
                <Link className={styles.Link} to="/login">
                  Log in!
                </Link>
              </Flex>

              {/* Display an error if any */}
              {/* {error && (
                <p style={{ color: 'red' }}>{error}</p>
              )} */}
            </Flex>
          </form>
        </CustomCard>
      </div>
    </div>
  );
}

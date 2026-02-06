import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/api/loginApi';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const LogInPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('token', data.access_token);
      navigate('/hotels');
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    mutate(data);
  };

  const apiError = error as AxiosError<{ detail: string }> | null;

  return (
    <div className="bg-background-light font-display min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-200">
      <div className='w-full max-w-110 bg-white  rounded-2xl shadow-card overflow-hidden border border-slate-500 '>
        <div className="h-2 bg-primary w-full"></div>
        <div className="p-8 bg-white rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className="mt-1 block w-full"
                disabled={isPending}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                className="mt-1 block w-full"
                disabled={isPending}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            {apiError && (
              <p className="text-red-500 text-sm text-center">
                {apiError.response?.data?.detail || 'Invalid credentials. Please try again.'}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Logging in...' : 'Log In'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { signIn } from '@/services/users'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '@/store/auth-store'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'

const signInSchema = z.object({
    email: z.string({ message: 'E-mail é obrigatório' }).email({ message: 'Formato de e-mail invalido' }),
    password: z.string({ message: 'Senha é obrigatória' }).min(6, { message: 'Senha precisa ter no minimo 6 digitos' })
})
type SignInSchema = z.infer<typeof signInSchema>

export default function Page() {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema)
    })
    const { login } = useAuthStore()
    const { mutate } = useMutation({
        mutationFn: async ({ email, password }: SignInSchema) => {
            return await signIn(email, password)
        },
        onSuccess: (data) => {

            login(data)
            router.push('/')
        },
        onError: (err: any) => {
            if (err.response.data.message === "Invalid credentials.") {
                toast('Credenciais invalidas')

            }
        }

    })

    const onSubmit = (data: SignInSchema) => {
        mutate(data)
    }

    return (
        <form className="flex min-h-screen flex-col  justify-center px-4 max-w-screen-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <h1 className='text-2xl text-center'>Login</h1>
            <div className="space-y-2 mb-4">
                <Label htmlFor="email"  >E-mail</Label>
                <Input type="email" id="email" {...register('email')} error={errors.email?.message} />
            </div>

            <div className="space-y-2 mb-4" >
                <Label htmlFor="password">Password</Label>
                <Input type="Password" id="password"   {...register('password')} error={errors.password?.message} />
            </div>

            <Button className="w-full" type="submit" >
                Login
            </Button>
        </form>
    )
}
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'





export default function Page() {
   
    return (
        <form className="flex min-h-screen flex-col  justify-center px-4 max-w-screen-sm mx-auto">
            <h1 className='text-2xl text-center'>Login</h1>
            <div className="space-y-2 mb-4">
                <Label htmlFor="email" >E-mail</Label>
                <Input type="email" id="email" />
            </div>

            <div className="space-y-2 mb-4" >
                <Label htmlFor="password">Password</Label>
                <Input type="Password" id="password"  />
            </div>
           
            <Button className="w-full" type="submit" >
                Login
            </Button>
        </form>
    )
}
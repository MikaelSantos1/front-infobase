import { api } from "../api";

export async function signIn(email: string, password: string) {
    const { data } = await api.post('/users/sign-in', {
        email, password
    })
    return data
}

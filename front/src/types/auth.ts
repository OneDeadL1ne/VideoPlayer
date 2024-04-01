import { JwtPayload } from 'jwt-decode'
import { UserInterface } from './user'

export interface AuthInterface {
    isLogin: boolean
    user: number | null
}

export interface TokenInterface {
    token: string | null
    user:UserInterface
    
}

export interface AuthPayloadInterface {
    username: string
    password: string
}

export interface RefreshPayloadInterface {
    token: string
}

export interface JWT extends JwtPayload {
    id: number
}

import { AuthenticationRequest } from './AuthenticationRequest';

export interface PasswordChangeRequest extends AuthenticationRequest {
    newPassword: string;
}
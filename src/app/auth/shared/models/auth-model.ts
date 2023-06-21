export class LoginRequestModel {
    public username = ''
    public password = ''
}

export class LoginResponseModel {
    public username = ''
    public email = ''
    public fullname = ''
    public secureId = ''
    public accessToken = ''
}

export class RegisterRequestModel {
    public password = ''
    public username = ''
    public fullName = ''
    public email = ''
    public phone = ''
}

export class RegisterResponseModel {
    public temporaryToken = ''
}

export class VerifyOtpRequestModel {
    public otp = ''
}

export class EditProfileRequestModel {
    public fullname = ''
    public email = ''
}

export class ChangePasswordRequestModel {
    public oldPassword = ''
    public newPassword = ''
}

export class ForgotPasswordRequestModel {
    public email = ''
}

export class ResetPasswordRequestModel {
    public code = ''
    public newPassword = ''
}

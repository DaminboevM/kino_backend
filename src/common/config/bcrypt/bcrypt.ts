import * as bcrypt from 'bcrypt';


export const hashPass = async (password: string) => {
    const salt = 10;
    return await bcrypt.hash(password, salt)
}


export const compirePass = async (pass: string, hashPass: string) => {
    return await bcrypt.compare(pass, hashPass)
}

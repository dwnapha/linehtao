import bcrypt from 'bcrypt'

export const hashPassword = async (password) =>{
    try{
        const saltRounds = 10;
        const hashedresult = await bcrypt.hash(password , saltRounds)
        return hashedresult
    }
    catch(err){
        console.log(err)
    }
}
export const comparePassword = async (password , hashedresult) =>{
    return bcrypt.compare(password , hashedresult); // boolean to check if correct passwor for login.
}
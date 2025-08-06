// auth pages
const registerController = (req,res) => {
    res.render('../views/auth/register')
}
const loginController = (req,res) => {
    res.render('../views/auth/login')
}

export { registerController , loginController}
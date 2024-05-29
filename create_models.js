app.post('users/create'), async (req,res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({
            ok:true,
            msj: `Usuario creado con exito`,
            newUser
        })
    } 
    catch {
        res.status(404).json({
            ok:true,
            msj: `Usuario no creado`
        })
    }
}
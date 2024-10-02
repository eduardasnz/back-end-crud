import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'
const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(cors())
app.listen(3232)



// post = criar um usuario
app.post('/usuarios', async (req, res) => {
    
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name, 
            age: req.body.age 
        }
    })
    res.send('deu certo')
})

// get = pegar usarios
app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany()

    res.status(200).json(users)

})


// put = editar
app.put('/usuarios/:id', async (req, res) => {
    
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name, 
            age: req.body.age 
        }
    })
    res.status(201).json(req.body)
})

//delete = deletar um user
app.delete('/usuarios/:id', async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: "usuario deletado!" })
})


// user: mariaeduarda e senha: Zzcg2WEaDJq9PPwy
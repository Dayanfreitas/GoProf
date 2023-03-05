const { User } = require("../model");
const multer = require('multer');
const multerConfig = require('./../config/multer');
const authMiddleware = require('../middlewares/auth');
const isAdminPermissionMiddleware = require('../middlewares/permission');
const yourselfMiddleware = require('../middlewares/yourself');

const express = require('express');

const router = express.Router();

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.query().findOne({ email: email })
        
        if(!user) {
            return res.status(401).json({type: 'error', message: 'User not found !' })
        }

        if(!(await user.verifyPassword(password))) {
            return res.status(401).json({ message: 'Incorrect password !' })
        }

        user.passwordHash = undefined
        return res.status(200).send({
            user: user,
            token: user.generateToken(),
            message: 'Successfully authenticated !'
        })
    } catch (err) {
        return res.status(400).json({ error: 'Registration failed', err})
    }
})

router.use(authMiddleware)
router.get('/auth', async (req, res) => {
    try{
        const user = await User.query()
                               .select('users.*', {url_image: 'users.name_image'}, {nick_name: "athletes.name"}, 'athletes.categorie_id', 'athletes.position_id', 'athletes.score') 
                               .leftJoinRelated('athletes')
                               .where('users.id', req.userID)
                               .first()
        if(!user) {
            res.status(404).json({err: 'Not Found'})
        }

        user.passwordHash = undefined
        user.token = undefined
        user.url_image = process.env.APP_URL + '/files/' + user.url_image
        res.json({ok: true, user})
    }catch(err) {
        return res.status(500).json({ error: 'Error interno', err});
    }
})

router.get('/:id', yourselfMiddleware, async (req, res) => {
    try{
        const { id } = req.params
        let user = {}
        user = await User.query()
                        .select('users.*', {url_image: 'users.name_image'}, {nick_name: "athletes.name"}, 'athletes.categorie_id', 'athletes.position_id', 'athletes.score') 
                        .leftJoinRelated('athletes')
                        .where('users.id', id)
                        .first()

        if(!user) {
            res.status(404).json({err: 'Not Found'})
        }

        user.passwordHash = undefined
        user.token = undefined

        user.url_image = process.env.APP_URL + '/files/' + user.url_image
        
        res.json({ok: true, user})

    }catch(err) {
        return res.status(500).json({ error: 'Error interno', err});
    }
})

router.post('/image', multer(multerConfig).single('avatar'), async (req, res) => {
    const { file } = req

    const currentUser = User.query().findOne({ id: req.userID })
    if(! await currentUser.first()) {
        return res.status(404).json({ error: 'Not Found' });
    }

    await currentUser.patch({ name_image: file.filename })

    return res.status(201).json({ 
        ok: true,
        url: `${process.env.APP_URL}/files/${file.filename}`
    });
})

router.post('/create', async (req, res) => {
    const { name, 
            permission,
            email,
            password,
            phone,
            genre,
            nick_name,
            categorie_id,
            position_id } = req.body

    try {
        let user = await User.query().findOne({ email: email })
    
        if(user) {
            return res.status(400).send({error: 'E-mail already registered'});
        }
    
        user = await User.query().insert({
            name,
            email,
            phone,
            permission, 
            passwordHash: password,
            genero: genre
        });

        user.passwordHash = undefined
        
        if(user) {
            const athlete = await ServiceAthletes.create({
                name: nick_name,
                categorie_id,
                position_id,
            });

            await User.query()
                .findById(user.id)
                .patch({
                    athlete_id: athlete.id
                });
        }

        return res.status(201).json({ 
            user, 
            token: user.generateToken(),
            mensagem: 'Successfully registered !'
        });
    } catch (err) {
        return res.status(400).json({ error: 'Registration failed', err});
    }
})


router.put('/:id', async (req, res) => {
    const getUserById = (id) => {
        return User.query().findOne({ id })
    }

    try{
        const { id } = req.params
        const { name, 
                email,
                phone,
                genre,
                nick_name,
                position_id 
            } = req.body
        const currentUser = await getUserById(req.userID);

        let user = await getUserById(id);
        if (!user) {
            return res.status(404).json({
                mensagem: 'Not Found!'
            });
        }

        const affectedRows = await getUserById(id).patch({ name, email, phone, genero: genre });
        
        if (currentUser.permission) {
            const { permission } = req.body
            await getUserById(id).patch({ permission });
        }
        
        user = await getUserById(id);
        if(user.athlete_id) {
            const params_athlete = {
                id: user.athlete_id,
                name: nick_name,
                position_id,
            }
            
            if (user.permission || currentUser.permission) {
                const { categorie_id } = req.body
                params_athlete['categorie_id'] = categorie_id || null
            }

            await ServiceAthletes.update(params_athlete);
        }else {
            const athlete = await ServiceAthletes.create({
                name: nick_name,
                position_id,
            });

            await getUserById(id).patch({ athlete_id: athlete.id });
            user.athlete_id = athlete.id
        }
        user.passwordHash = undefined
        return res.status(200).json({
            user,
            affectedRows,
        });

    }catch (err){
        console.error(err)
        return res.status(501).json({ error: 'Update failed', err});
    }
})

router.get('/', isAdminPermissionMiddleware, async (req, res) => {
    const users = await ServiceUsers.getAll();
    res.status(200).json({ ok: true, users })
});

module.exports = router
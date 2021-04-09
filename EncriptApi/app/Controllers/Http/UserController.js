'use strict'

const { appKey } = require("../../../config/app");

const Encryption = use('Encryption');
const Hash = use('Hash');
const User = use('App/Models/User');
const Token = use('App/Models/Token');
const Config = use('Config');

class UserController {

    async register({ request, response }) {
        try {
            const data = await request.all();
            const user = new User();

            const checkUser = await User.query().select('*').where('email', data.email).fetch();

            if (checkUser.size() > 0) {
                return response.status(400).json({ message: "El usuario ya esta registrado, Incie sesión" });
            }

            user.username = data.username;
            user.email = data.email;
            user.password = data.password;

            if (user.save()) {
                return response.status(200).json({ message: "Usuario creado correctamente", user });
            }

        } catch (error) {
            return response.status(500).json({ message: "La solicitud no fue procesada correctamente" });
        }
    }

    async login({ auth, request, response }) {
        try {
            const data = await request.all();

            // Ejemplo para hash manual.
            const safeUser = await Hash.make(request.input('username'));

            return await auth.withRefreshToken().attempt(data.email, data.password);

        } catch (error) {
            return response.status(500).json({ message: "La solicitud no fue procesada correctamente" });
        }
    }

    async deleteAuth({ response, auth }) {
        try {
            // get user information 
            const user = await auth.getUser();
            // find a token with the user id
            const token = await Token.findBy('user_id', user.id);
            await token.delete();
            return response.status(200).json({ message: "Sesión finalizada correctamente" });
        } catch (error) {
            return response.status(500).json({ message: "No se realizo la petición exitosamente" });
        }
    }
}

module.exports = UserController

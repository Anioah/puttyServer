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
}

module.exports = UserController
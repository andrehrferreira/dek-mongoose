import { createUser, getAllUsers } from "../controllers/users";

export default async (router) => {
    router.route('/users').post(createUser).get(getAllUsers);
}

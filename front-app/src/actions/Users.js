// import Api from "../services/api";
// import Navigator from '../utils/navigator'

// function UsersActions() {
//     const getAll = async () => {
//         return new Promise((resolve, reject) => {
//             Api.get(`/users`)
//                 .then((data) => {
//                     resolve(data)
//                 }).catch((err) => {
//                     const navigator = Navigator();
//                     const { response } = err 
                    
//                     navigator.validateRouter(response)
//                     resolve(err)
//                 })
//         })
//     }

//     return {
//         getAll,
//     }
// }

// export default UsersActions
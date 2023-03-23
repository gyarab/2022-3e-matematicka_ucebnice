
export default function handler(req, res) {
    // auth user? usage of middleware? ==> auth redirect?
    // need to check whether score already exists or not
    // return in prescribed JSON format - Egor ought to create it


    res.status(200).json({ name: 'John Doe' })
}
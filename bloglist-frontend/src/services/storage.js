const KEY = 'blogUserKey'

const saveUser = (user) => {
    localStorage.setItem(KEY, JSON.stringify(user))
}

const loadUser = () => {
    const user = localStorage.getItem(KEY)
    return user ? JSON.parse(user) : null
}

const logoutUser = () => {
    localStorage.setItem(KEY, '');
}

const me = () => {
    const user = loadUser()
    return user ? user.username : null
}

export default { saveUser, loadUser, logoutUser, me }
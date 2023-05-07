let users = [];

const addUsers = (user) => {
    users.push(user);
}

const getUsers = () => {
    return users;
  
}

const findUserWithEmail = (email) => {
    return users.find((user) => user.email === email)
}

const updateUser = (updatedUser) => {
    let userIndex = users.indexOf((user) => user.email === email);
    if (userIndex < 0) {
        return -1;
    }else {
        users[userIndex] = updatedUser;
        return 1;
    }

}



module.exports = {addUsers, getUsers, findUserWithEmail, updateUser};
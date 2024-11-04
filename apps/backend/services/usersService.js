export const MAX_USERS = 5;
export const users = {};

export const saveUser = ({ login, name, avatar_url }) => {
    return users[login] = {
        username: login,
        nome: name || 'Nome não disponível',
        avatar: avatar_url,
        starred: false
    };
};

export const toggleStarredUser = (username) => {
    const currentlyStarredUser = Object.values(users).find(user => user.starred);
    if (currentlyStarredUser && currentlyStarredUser.username !== username) {
        currentlyStarredUser.starred = false;
    }

    const user = users[username];
    user.starred = !user.starred;

    return user;
};
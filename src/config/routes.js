const routes = {
    home: '/',
    following: '/following',
    contact: '/contact',
    search: function ({ searchId = ':searchId', value = ':value' }) {
        return '/search/' + value + '/' + searchId;
    },
    // searchUser: function (searchId = ':searchId') {
    //     return '/search/users/' + searchId;
    // },
    // searchCollection: function (searchId = ':searchId') {
    //     return '/search/collections/' + searchId;
    // },
    detailPhoto: function (id = ':id') {
        return '/photo/' + id;
    },
    collection: function (id = ':id') {
        return '/collection/' + id;
    },
    user: function ({ userName = ':username', value = ':value' }) {
        return '/user/' + userName + '/' + value;
    },
    // userLike: function (userName = ':username') {
    //     return '/user/' + userName + '/likes';
    // },
    // userCollection: function (userName = ':username') {
    //     return '/user/' + userName + '/collections';
    // },
    topic: function ({ topicIdOrSlug = ':topicIdOrSlug' }) {
        return '/topic/' + topicIdOrSlug;
    },
};

export default routes;

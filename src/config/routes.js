const routes = {
    home: '/',
    following: '/following',
    contact: '/contact',
    search: function (searchId = ':searchId') {
        return '/search/' + searchId;
    },
    searchTest: function (searchTestId = ':searchTestId') {
        return '/searchTest/' + searchTestId;
    },
    detailPhoto: function (id = ':id') {
        return '/photo/' + id;
    },
    collection: function (id = ':id') {
        return '/collection/' + id;
    },
    user: function (userName = ':username') {
        return '/user/' + userName;
    },
};

export default routes;

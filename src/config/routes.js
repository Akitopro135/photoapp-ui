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
};

export default routes;

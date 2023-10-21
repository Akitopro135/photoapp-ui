import { Contact } from '~/pages/Contact';
import { Search } from '~/pages/Search';
import { DetailPhoto } from '~/pages/DetailPhoto';
import { Collection } from '~/pages/Collection';
import { User } from '~/pages/User';
import { Topic } from '~/pages/Topic';
import { Home } from '~/pages/Home';
import { Following } from '~/pages/Following';
import { HeaderOnly } from '~/layouts';
import config from '~/config';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.search({}), component: Search },
    // { path: config.routes.searchUser(), component: Search },
    // { path: config.routes.searchCollection(), component: Search },
    { path: config.routes.detailPhoto(), component: DetailPhoto },
    { path: config.routes.contact, component: Contact, layout: HeaderOnly },
    { path: config.routes.collection(), component: Collection },
    { path: config.routes.user({}), component: User },
    // { path: config.routes.userLike(), component: User },
    // { path: config.routes.userCollection(), component: User },
    { path: config.routes.topic({}), component: Topic },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };

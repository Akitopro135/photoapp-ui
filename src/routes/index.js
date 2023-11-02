import config from '~/config';

import { Contact } from '~/pages/Contact';
import { Search } from '~/pages/Search';
import { DetailPhoto } from '~/pages/DetailPhoto';
import { Collection, Collections } from '~/pages/Collection';
import { User } from '~/pages/User';
import { Topic, Topics } from '~/pages/Topic';
import { Home } from '~/pages/Home';
import { Following } from '~/pages/Following';
import { Edit } from '~/pages/Account';

import { HeaderOnly } from '~/layouts';
import { AccountLayout } from '~/layouts/AccountLayout';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.search({}), component: Search },
    { path: config.routes.detailPhoto(), component: DetailPhoto },
    { path: config.routes.contact, component: Contact, layout: HeaderOnly },
    { path: config.routes.collection(), component: Collection },
    { path: config.routes.collection(''), component: Collections },
    { path: config.routes.user({}), component: User },
    { path: config.routes.topic({}), component: Topic },
    { path: config.routes.topic({ topicIdOrSlug: '' }), component: Topics },
    { path: config.routes.account({ value: '' }), component: Edit, layout: AccountLayout },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };

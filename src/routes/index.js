import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Contact from '~/pages/Contact';
import { HeaderOnly } from '~/layouts';
import config from '~/config';
import Search from '~/pages/Search';
import SearchTest from '~/pages/SearchTest';
import DetailPhoto from '~/pages/DetailPhoto';
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.search(), component: Search },
    { path: config.routes.searchTest(), component: SearchTest },
    { path: config.routes.detailPhoto(), component: DetailPhoto },
    { path: config.routes.contact, component: Contact, layout: HeaderOnly },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };

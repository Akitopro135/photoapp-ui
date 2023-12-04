import CollectionService from './services/collections';
import CurrentUserService from './services/current_user';
import PhotoService from './services/photo';
import SearchServices from './services/search';
import StatService from './services/stat';
import TopicService from './services/topic';
import UserService from './services/users';

const unsplash = {
    photo: PhotoService,
    user: UserService,
    search: SearchServices,
    collection: CollectionService,
    topic: TopicService,
    stat: StatService,
    current_user: CurrentUserService,
};

export default unsplash;

import SearchPage from '~/page/Search';
import config from '~/config';
import Home from '~/page/Home';
import Create from '~/page/Create';

import Write from '~/page/Write';
import Blog from '~/page/Blog';
import Login from '~/page/Login';
import Register from '~/page/Register';
import { OtherLayout } from '~/layouts';
import Profile from '~/page/Profile';
import Store from '~/page/Store';
import SearchDetail from '~/page/SearchDetail';
import Avatar from '~/page/Avatar';

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: OtherLayout },
    { path: config.routes.create, component: Create },
    { path: config.routes.search, component: SearchPage },
    { path: config.routes.searchDetail, component: SearchDetail },
    { path: config.routes.blog, component: Blog },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.blog_title, component: Blog },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.store, component: Store },
    { path: config.routes.avatar_selector, component: Avatar, layout: null },
];

const protectedRoutes = [{ path: config.routes.write_blog, component: Write }];
const privateRoutes = [];

export { publicRoutes, privateRoutes, protectedRoutes };

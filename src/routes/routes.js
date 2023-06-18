import React from 'react';
import config from '~/config';
import { OtherLayout } from '~/layouts';
import Write from '~/page/Write/Write';
import Avatar from '~/page/Avatar/Avatar';

const SearchPage = React.lazy(() => import('~/page/Search'));
const Home = React.lazy(() => import('~/page/Home'));
const Create = React.lazy(() => import('~/page/Create'));
const Blog = React.lazy(() => import('~/page/Blog'));
const Login = React.lazy(() => import('~/page/Login'));
const Register = React.lazy(() => import('~/page/Register'));
const Profile = React.lazy(() => import('~/page/Profile'));
const Store = React.lazy(() => import('~/page/Store'));
const SearchDetail = React.lazy(() => import('~/page/SearchDetail'));
const Feedback = React.lazy(() => import('~/page/Feedback'));
const FeedbackList = React.lazy(() => import('~/page/FeedbackList'));
const Error = React.lazy(() => import('~/page/Error'));

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
    { path: config.routes.feedback, component: Feedback, layout: null },
    { path: config.routes.list_feedback, component: FeedbackList, layout: null },
    { path: config.routes.error, component: Error, layout: null },
];

const protectedRoutes = [{ path: config.routes.write_blog, component: Write }];
const privateRoutes = [];

export { publicRoutes, privateRoutes, protectedRoutes };

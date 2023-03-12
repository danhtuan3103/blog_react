const routes = {
    home: '/',
    search: '/search',
    searchDetail: '/search/:type',
    create: '/create',
    write_blog: '/blog/write',
    blog: '/blog',
    blog_title: '/blog/:id',
    register: '/register',
    login: '/login',
    profile: '/profile/:id',
    store: '/store/:type',
    avatar_selector: '/avatar/select',
    feedback: '/feedback',
    list_feedback: '/feedback/list',
    error: '/*',
};

export default routes;

import Main from "@/view/Main.vue";

export const loginRouter = {
    path: "/login",
    name: "login",
    meta: {
        title: "系统登入"
    },
    component: resolve => require(['@/components/Login.vue'], resolve)
};

export const registerRouter = {
    path: "/register",
    name: "register",
    meta: {
        title: "用户注册"
    },
    component: resolve => require(['@/components/Register.vue'], resolve)
};

export const IndexRouter = {
    path: "/",
    name: "IndexRouter",
    component: Main,
    redirect: "/Index/MyTask",
    children: [{
        path: "Index",
        name: "Index",
        meta: { title: "经销商管理系统" },
        component: resolve => require(['@/view/Index/Index.vue'], resolve),
        children: [{
            path: "MyTask",
            name: "MyTask",
            meta: { title: "经销商管理系统" },
            component: resolve => require(['@/view/Index/MyTask.vue'], resolve)
        }, {
            path: "MyApply",
            name: "MyApply",
            meta: { title: "经销商管理系统" },
            component: resolve => require(['@/view/Index/MyApply.vue'], resolve)
        }]
    }
    ]
};


export const DistributorRouter = {
    path: "/",
    component: Main,
    name: "DistributorRouter",
    // redirect: '/home',
    meta: {
        title: "经销商管理系统"
    },
    children: [{
        path: "distributor",
        name: "distributor",
        meta: { title: "经销商管理系统" },
        component: resolve => require(['@/view/Distributor/Index.vue'], resolve),
        children: [
            {
                path: "distributormaster",
                name: "distributormaster",
                meta: { title: "经销商管理系统" },
                component: resolve => require(['@/view/Distributor/DistributorMaster.vue'], resolve)
            }
        ]
    }]
};

export const SearchRouter = {
    path: "/",
    component: Main,
    name: "SearchRouter",
    // redirect: '/home',
    meta: {
        title: "经销商管理系统"
    },
    children: [{
        path: "Search",
        name: "Search",
        meta: { title: "经销商管理系统" },
        component: resolve => require(['@/view/Search/Index.vue'], resolve),
        children: [{
            path: "Distributorinformation",
            name: "Distributorinformation",
            meta: { title: "经销商管理系统" },
            component: resolve => require(['@/view/Search/DistributorPage.vue'], resolve)
        }, {
            path: "Delegateinformation",
            name: "Delegateinformation",
            meta: { title: "经销商管理系统" },
            component: resolve => require(['@/view/Search/DelegatePage.vue'], resolve)
        }]
    }]
};

export const FromPage = {
    path: "/FromPage",
    component: Main,
    name: "FromPage",
    // redirect: '/home',
    meta: {
        title: "经销商管理系统"
    },
    children: [{
        path: "DelegatePage",
        name: "DelegatePage",
        meta: { title: "经销商管理系统" },
        component: resolve => require(['@/view/Form/DelegatePage.vue'], resolve)
    }, {
        path: "TargetPage",
        name: "TargetPage",
        meta: { title: "经销商管理系统" },
        component: resolve => require(['@/view/Form/TargetPage.vue'], resolve)
    }]
};

export const WorkflowRouter = {
    path: "/",
    component: Main,
    name: "WorkflowRouter",
    // redirect: '/home',
    meta: {
        title: "经销商管理系统"
    },
    children: [{
        path: "Workflow",
        name: "Workflow",
        meta: { title: "经销商管理系统" },
        component: resolve => require(['@/view/Workflow/Index.vue'], resolve),
        children: [{
            path: "Index",
            name: "workflowindex",
            meta: { title: "经销商管理系统" },
            component: resolve => require(['@/view/Workflow/workflowmenu.vue'], resolve)
        }]
    }, {
        path: "EmpowermentProcess/:Action",
        name: "EmpowermentProcess",
        meta: { title: "经销商管理系统" },
        component: resolve => require(['@/view/Workflow/Empowerment/EmpowermentProcess.vue'], resolve)
    }, {
        path: "VendorProcess/:Action",
        name: "VendorProcess",
        meta: { title: "经销商管理系统" },
        component: resolve => require(['@/view/Workflow/Vendor/VendorProcess.vue'], resolve)
    }, {
        path: "EmpowermentChange/:Action",
        name: "EmpowermentChange",
        meta: { title: "经销商管理系统" },
        component: resolve => require(['@/view/Workflow/EmpowermentChange/EmpowermentChange.vue'], resolve)
    }]
};
export const page403 = {
    path: "*",
    name: "page403",
    meta: {
        title: "非法请求"
    },
    component: resolve => require(['@/error/errorpage-403'], resolve)
};

export const page404 = {
    path: "*",
    name: "page404",
    meta: {
        title: "你所在的页面神游啦"
    },
    component: resolve => require(['@/error/errorpage-404'], resolve)
};

export const page504 = {
    path: "/page504",
    name: "page504",
    meta: {
        title: "请求超时"
    },
    component: resolve => require(['@/error/errorpage-504'], resolve)
};

export const routers = [
    loginRouter,
    registerRouter,
    IndexRouter,
    DistributorRouter,
    WorkflowRouter,
    FromPage,
    page403,
    page404,
    page504,
    SearchRouter
];
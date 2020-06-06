import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
				{
					path: '/goodList',
					component: () => import(/* webpackChunkName: "form" */ '@/view/commodityManagement/goodList/goodList.vue'),
					meta: { title: '商品列表' },
				},
                {
                    path: '/orderList',
                    component: () => import(/* webpackChunkName: "form" */ '@/view/orderManagement/orderList.vue'),
                    meta: { title: '订单列表' },
                },
                {
                    path: '/EvaluationList',
                    component: () => import(/* webpackChunkName: "form" */ '@/view/evaluationManagement/EvaluationList.vue'),
                    meta: { title: '评价列表' },
                },
                {
                    path: '/basicSetup',
                    component: () => import(/* webpackChunkName: "form" */ '@/view/storeManagement/basicSetup/index.vue'),
                    meta: { title: '店铺基本设置' },
                },
                {
                    path: '/classificationManagement',
                    component: () => import(/* webpackChunkName: "form" */ '@/view/storeManagement/classificationManagement/index.vue'),
                    meta: { title: '店铺分类' },

                },
                {
                    path: '/logisticsIsSet',
                    component: () => import(/* webpackChunkName: "form" */ '@/view/storeManagement/logisticsIsSet/index.vue'),
                    meta: { title: '物流设置' },
                },
                {
                    path: '/returnAddressManagement',
                    component: () => import(/* webpackChunkName: "form" */ '@/view/storeManagement/returnAddressManagement/index.vue'),
                    meta: { title: '退货地址管理' },
                },
                {
                    path: '/storeDeposit',
                    component: () => import(/* webpackChunkName: "form" */ '@/view/storeManagement/storeDeposit/index.vue'),
                    meta: { title: '店铺保证金' },
                },
                // 营销推广管理
                {
                    path: '/couponManagement',
                    component: () => import(/* webpackChunkName: "form" */ '@/view/marketingPromotion/couponManagement/index.vue'),
                    meta: { title: '优惠券管理' },
                },
                {
                    path: '/activity',
                    component: () => import(/* webpackChunkName: "form" */ '@/view/marketingPromotion/activityManagement/index.vue'),
                    meta: { title: '活动管理' },
                },
                {
                    path: '/advertising',
                    component: () => import(/* webpackChunkName: "form" */ '@/view/marketingPromotion/advertisingManagement/index.vue'),
                    meta: { title: '广告管理' },
                },
                {
                    path: '/refundManagement',
                    component: () => import(/* webpackChunkName: "form" */ '@/view/afterSaleManagement/refundManagement/index.vue'),
                    meta: { title: '退款管理' },
                },
                {
                    path: '/refundReturn',
                    component: () => import(/* webpackChunkName: "form" */ '@/view/afterSaleManagement/refundReturn/index.vue'),
                    meta: { title: '退货退款管理' },
                },
                {
                    path: '/maintenanceAanagement',
                    component: () => import(/* webpackChunkName: "form" */ '@/view/afterSaleManagement/maintenanceAanagement/index.vue'),
                    meta: { title: '维修管理' },

                },
                // 数据管理
                {
                    path: '/businessData',
                    component: () => import(/* webpackChunkName: "form" */ '@/view/theDataCenter/businessData/index.vue'),
                    meta: { title: '经营数据' },
                },
                {
                    path: '/userData',
                    component: () => import(/* webpackChunkName: "form" */ '@/view/theDataCenter/userData/index.vue'),
                    meta: { title: '用户数据' },
                },
                {
                    path: '/storeData',
                    component: () => import(/* webpackChunkName: "form" */ '@/view/theDataCenter/storeData/index.vue'),
                    meta: { title: '店铺数据' },
                },
                {
                    path: '/customerManagement',
                    component: () => import(/* webpackChunkName: "form" */ '@/view/customerManagement/index.vue'),
                    meta: { title: '客户管理' },
                },
                {
                    path: '/AllTheDynamic',
                    component: () => import(/* webpackChunkName: "form" */ '@/view/dynamicManagementGoods/AllTheDynamic/index.vue'),
                    meta: { title: '全部动态' },
                },
                {
                    path: '/releaseTheDynamic',
                    component: () => import(/* webpackChunkName: "form" */ '@/view/dynamicManagementGoods/releaseTheDynamic/index.vue'),
                    meta: { title: '发布动态' },
                },
                {
                    path:'/addGood',//添加商品
                    component: () => import(/* webpackChunkName: "form" */ '@/view/commodityManagement/goodList/addGood.vue'),
                    meta: { title: '添加商品' },
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});

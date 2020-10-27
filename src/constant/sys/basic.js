export default {
    positionList: '/system/basic/position/list',// 职位列表
    position: '/system/basic/position/',// post添加职位 put修改职位 del url带id为删除
    delMany: '/system/basic/position/many', // 多选删除,

    // 职称相关
    titleLevel: '/system/basic/job/level/title/level', // 职称列表
    jobLevel: '/system/basic/job/level/', // 相关职称操作方法

    // 权限组相关
    allRoles: '/employee/basic/auth/all/role', // 获取所有角色
    menuByRoleId: '/employee/basic/auth/menuIdsByRoleId/', // 根据角色id获取所属菜单
    grantMenuToRole: '/employee/basic/auth/grant/menu', // 授予角色菜单
    role: '/employee/basic/auth/role/', // 添加角色

    // 部门管理相关
    department: '/system/basic/department/', // 获取组织树

    // 操作员管理
    hrs: '/system/hr', // 获取所有hr
}

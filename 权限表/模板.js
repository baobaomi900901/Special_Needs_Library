/*
    1.金融科技部, 将权限 [金融科技部-role, 自动化开发-role] 设置成作用于所有子级;
    2.将权限 [领导大屏-role] 设置成作用于 金融科技部 可使用 [@张朝阳, @陈磊];
    3.李伟可以使用
    4.刘洋不可以使用, 自动化开发-role 
    5.刘洋添加, 珠光集团运维-role 

    #金融科技部
        └ @张朝阳(领导)
        └ @陈磊(员工)
        └ #珠海分部
            └ @李伟
            └ #珠光集团项目运维组
                └ @刘洋
*/

// 人员表 10 开头
const users = [
    {
        id: 100001,
        name: '张朝阳-金融科技部-经理',
        department: [200001],
    },
    {
        id: 100002,
        name: '陈磊-金融科技部-员工',
        department: [200001],
    },
    {
        id: 100003,
        name: '李伟',
        department: [200004],
    },
    {
        id: 100004,
        name: '刘洋',
        department: [200005],
    },
]


// 部门表 20 开头
const departments = [
    {
        id: 200001,
        name: '金融科技部',
        level: 1,
        parent_id: 0,
    },
    {
        id: 200002,
        name: '珠海分部',
        level: 2,
        parent_id: 200001,
    },
    {
        id: 200003,
        name: '珠光集团项目运维组',
        level: 3,
        parent_id: 200002,
    },
]

// 查询优化表, 避免递归查询
const roleParent = [
    {
        id: 2100001,
        department: 200001, // 金融科技部
        parent_id: 0, // 没有父级
        parent_level: 0, // 顶级部门
    },
    {
        id: 2100002,
        department: 200002, // 珠海分部
        parent_id: 200001, // 金融科技部
        parent_level: 1, // 父级是 1 级部门
    },
    {
        id: 2100003,
        department: 200003, // 珠光集团项目运维组
        parent_id: 200002, // 珠海分部
        parent_level: 2, // 父级是 2 级部门
    }
]



// 权限表 30 开头
const roles = [
    {
        id: 300001,
        name: '金融科技部-role',
        permission: ['文档中心-公共(金融科技部)', '流程库-公共(金融科技部)'],
    },
    {
        id: 300002,
        name: '自动化开发-role',
        permission: ['开发中心'],
    },
    {
        id: 300003,
        name: '领导大屏-role',
        permission: ['领导大屏'],
    },
    {
        id: 300004,
        name: '珠光分部-role',
        permission: ['文档中心-珠海', '流程库-珠海'],
    },
    {
        id: 300005,
        name: '珠光集团运维-role',
        permission: ['机器人管理-分组(珠光集团)'],
    },
]

// 部门权限关系表 50 开头
/* 写入条件: 
    1. 自定义, 在 [部门管理] [详情-部门] 组织权限中 添加权限时:
        {
            department: 所属部门,
            role: 权限ID,
            status: 1, // 最终使用, 1使用, 0不使用
            default: 1, // 默认权限, 1使用, 0不使用
            from: 0, // 继承关系, 如果是0, 则自己使用, 如果是部门ID, 则继承部门权限
            is_to_child: 1, // 是否给子级继承, 1继承, 0不继承
        }
    2. 继承, 创建部门时, 查询所有父级是否有 is_to_child == 1 的权限, 如果有, 则写入此表; 
*/
const roleDepartment = [
]

// 角色权限关系表, 个人权限, 或者不停用 组织权限时写入此表;
// 使用时, 优先查询 roleUser, 然后查询 roleDepartment, roleUser 权限大于 roleDepartment
// 当 roleDepartment 移除权限时, roleUser 也要移除:
//      例子: 金融科技部 移除 自动化开发-role, 查询 金融科技部下的所有人员id, 然后查询 roleUser, 匹配 role 与 user, 移除相关数据


/* 4.刘洋不可以使用, 自动化开发-role 
    写入条件: 在 [用户管理] [详情-用户] 选择停用组织权限时:
    {
        users: 100004, // 刘洋
        role: 300002, // 自动化开发-role
        status: 0, // 最终不使用
    },
    5.刘洋添加, 珠光集团运维-role 
        写入条件: 在 [用户管理] [详情-用户] 选择添加个人权限时:
        {
            users: 100004, // 刘洋
            role: 300005, // 珠光集团运维-role
            status: 1, // 最终使用
        }
*/
const roleUser = [
    {
        id: 600001,
        users: 100003, // 李伟
        role: 300001,
        status: 0, // 最终不使用
    },
]

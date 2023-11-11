// 用户表
// #region 模板
/*
    {   
        user_id: 100000,
        user_name: '系统管理',
        department: [0],
    },
*/
// #endregion
const users = [
    {
        user_id: 100000,
        user_name: 'admin',
        dept_id_array: [200000],
    },
    {
        user_id: 100001,
        user_name: '张三',
        dept_id_array: [200000],
    },
    {
        user_id: 100002,
        user_name: '张朝阳--金融科技部--领导',
        dept_id_array: [200001],
    },
    {
        user_id: 100003,
        user_name: '陈磊--金融科技部--员工',
        dept_id_array: [200001],
    },
    // 李洋, 绑定在珠海分部下
    {
        user_id: 100004,
        user_name: '李伟',
        dept_id_array: [200002],
    },
    // 刘洋, 绑定在珠光集团项目运维组下
    {
        user_id: 100005,
        user_name: '刘洋',
        dept_id_array: [200003],
    },
]

// 组织表
// #region 模板
/*
    {   
        id: 200000,
        dept_name: '默认',
        level: 1,
        parent_id: 0,
    },
*/
// #endregion
const departments = [
    {
        dept_id: 200000,
        dept_name: '默认',
        dept_level: 1,
        parent_dept_id: 0, // 0 代表没有父级
    },
    {
        dept_id: 200001,
        dept_name: '金融科技部',
        dept_level: 1,
        parent_dept_id: 0,
    },
    // 在金融科技部下创建一个珠海分部
    {
        dept_id: 200002,
        dept_name: '珠海分部',
        dept_level: 2,
        parent_dept_id: 200001,
    },
    // 珠海分部下, 创建一个珠光集团项目运维组
    {
        dept_id: 200003,
        dept_name: '珠光集团项目运维组',
        dept_level: 3,
        parent_dept_id: 200002,
    },
]

// 父级组织查询优化表
/*
    {
        dp_id: 2100000,
        dept_id: 200000, // 默认
        parent_id: 0, // 没有父级
        parent_level: 0, // 顶级
    },
*/
// 查询优化表, 避免递归查询
const departmentParents = [
    // 默认
    {
        dp_id: 2100000,
        dept_id: 200000, // 默认
        parent_id: 0, // 没有父级
        parent_level: 0, // null
    },
    // 金融科技部
    {
        dp_id: 2100001,
        dept_id: 200001, // 金融科技部
        parent_id: 0, // 没有父级
        parent_level: 0, // null
    },
    // 遍历 珠海分部 的父级部门
    {
        dp_id: 2100002,
        dept_id: 200002, // 珠海分部
        parent_id: 200001, // 金融科技部
        parent_level: 1, // 父级是 1 级部门
    },
    // 遍历 珠光集团项目运维组 的所有父级部门
    {
        dp_id: 2100003,
        dept_id: 200003, // 珠光集团项目运维组
        parent_id: 200002, // 珠海分部
        parent_level: 2, // 父级是 2 级部门
    },
    {
        dp_id: 2100004,
        dept_id: 200003, // 珠光集团项目运维组
        parent_id: 200001, // 金融科技部
        parent_level: 1, // 父级是 1 级部门
    },
]

// 权限表
/*
    {
        role_id: 300000,
        role_name: '超级管理员',
        permission: [
            {
                name: 'IDE',
                config: {
                    add: true,
                    delete: true,
                    edit: true,
                    view: true,
                }
            },
        ]
    },
*/
const roles = [
    {
        role_id: 300000,
        role_name: '超级管理员',
        permission: [
            {
                name: '开发中心',
                config: {
                    add: true,
                    delete: true,
                    edit: true,
                    view: true,
                }
            }, {
                name: '领导大屏',
                config: {
                    add: true,
                    delete: true,
                    edit: true,
                    view: true,
                }
            }, {
                name: '文档中心-全部',
                config: {
                    add: true,
                    delete: true,
                    edit: true,
                    view: true,
                }
            }, {
                name: '流程库-全部',
                config: {
                    add: true,
                    delete: true,
                    edit: true,
                    view: true,
                }
            }
        ]
    },
    {
        role_id: 300001,
        role_name: '金融科技部-role',
        permission: [
            {
                name: '文档中心-公共(金融科技部)',
                config: {
                    add: true,
                    delete: true,
                    edit: true,
                    view: true,
                }
            }, {
                name: '流程库-公共(金融科技部)',
                config: {
                    add: true,
                    delete: true,
                    edit: true,
                    view: true,
                }
            }
        ]
    },
    {
        role_id: 300002,
        role_name: '自动化开发-role',
        permission: [
            {
                name: '开发中心',
                config: {
                    add: true,
                    delete: true,
                    edit: true,
                    view: true,
                }
            }
        ]
    },
    // 金融科技部最高审核权限
    {
        role_id: 300003,
        role_name: '金融科技部最高审核权限',
        permission: [
            {
                name: '财务审核-金融科技部',
                config: {
                    add: true,
                    delete: true,
                    edit: true,
                    view: true,
                }
            }]
    },
    // 领导大屏-role
    {
        role_id: 300004,
        role_name: '领导大屏-role',
        permission: [
            {
                name: '领导大屏',
                config: {
                    add: true,
                    delete: true,
                    edit: true,
                    view: true,
                }
            }
        ]
    },
    {
        role_id: 300005,
        role_name: '珠海分部-role',
        permission: [
            {
                name: '文档中心-公共(珠海分部)',
                config: {
                    add: true,
                    delete: true,
                    edit: true,
                    view: true,
                }
            },
            {
                name: '流程库-公共(珠海分部)',
                config: {
                    add: true,
                    delete: true,
                    edit: true,
                    view: true,
                }
            }
        ]
    },
    // 珠光集团运维组-role
    {
        role_id: 300006,
        role_name: '珠光集团运维组-role',
        permission: [
            {
                name: '文档中心-公共(珠光集团运维组)',
                config: {
                    add: true,
                    delete: true,
                    edit: true,
                    view: true,
                }
            },
            {
                name: '流程库-公共(珠光集团运维组)',
                config: {
                    add: true,
                    delete: true,
                    edit: true,
                    view: true,
                }
            }
        ]
    },
]


// 权限关系表
/*
    {
        roleRelation_id: 400000,
        role_id: 300000,
        dept_id: 200000,
        type: ['dept_id', 200000], // dept_id, user_id, 是部门还是用户
        status: 1, // 最终使用, 1使用, 0不使用
        default: 1, // 默认权限, 1使用, 0不使用
        from: 0, // 继承关系, 如果是0, 则自己使用, 如果是部门ID, 则继承部门权限
        is_to_child: 0, // 是否给子级继承, 1继承, 0不继承
    },
 */
const roleRelation = [
    // 将超级管理员绑定在默认部门上
    {
        roleRelation_id: 400000,
        role_id: 300000,
        type: ['dept_id', 200000], // dept_id, user_id, 是部门还是用户
        status: 1, // 最终使用, 1使用, 0不使用
        default: 1, // 默认权限, 1使用, 0不使用
        from: 0, // 继承关系, 如果是0, 则自己使用, 如果是部门ID, 则继承部门权限
        is_to_child: 0, // 是否给子级继承, 1继承, 0不继承
    },
    // 将 金融科技部-role 绑定在金融科技部上, 并继承给所有子级
    {
        roleRelation_id: 400001,
        role_id: 300001, // 金融科技部-role
        type: ['dept_id', 200001], // 金融科技部
        status: 1,
        default: 1,
        from: 0,
        is_to_child: 1,
    },
    // 将 自动化开发-role 绑定到金融科技部上, 并继承给所有子级
    {
        roleRelation_id: 400002,
        role_id: 300002, // 自动化开发-role
        type: ['dept_id', 200001], // 金融科技部
        status: 1,
        default: 1,
        from: 0,
        is_to_child: 1,
    },

    // 将 领导大屏-role 绑定到金融科技部上, 仅本级使用
    {
        roleRelation_id: 400003,
        role_id: 300003, // 领导大屏-role
        type: ['dept_id', 200001], // 金融科技部
        status: 1,
        default: 1,
        from: 0,
        is_to_child: 0,
    },

    // 将 金融科技部最高审核权限-role 绑定给张朝阳
    {
        roleRelation_id: 400004,
        role_id: 300003, // 金融科技部最高审核权限-role
        type: ['user_id', 100002], // 张朝阳
        status: 1,
        default: 1,
        from: 0,
        is_to_child: 0,
    },

    // 将 珠海分部-role 绑定到珠海分部上, 并继承给所有子级, 并创建所有父级运行继承的权限
    {
        roleRelation_id: 400005,
        role_id: 300005, // 珠海分部-role
        type: ['dept_id', 200002], // 珠海分部
        status: 1,
        default: 1,
        from: 0,
        is_to_child: 1,
    },
    {
        roleRelation_id: 400006,
        role_id: 300001, // 金融科技部-role
        type: ['dept_id', 200002], // 珠海分部
        status: 1,
        default: 1,
        from: 200001, // 金融科技部
        is_to_child: 1,
    },

    // 将 领导大屏 绑定到李伟上
    {
        roleRelation_id: 400007,
        role_id: 300004, // 领导大屏-role
        type: ['user_id', 100004], // 李伟
        status: 1,
        default: 1,
        from: 0,
        is_to_child: 0,
    },

    // 将 珠光集团运维组-role 绑定到珠光集团运维组上, 并继承给所有子级, 并创建所有父级运行继承的权限
    {
        roleRelation_id: 400008,
        role_id: 300006, // 珠光集团运维组-role
        type: ['dept_id', 200003], // 珠光集团运维组
        status: 1,
        default: 1,
        from: 0,
        is_to_child: 1,
    },
    {
        roleRelation_id: 40009,
        role_id: 300005, // 珠海分部-role
        type: ['dept_id', 200003], // 珠光集团运维组
        status: 1,
        default: 1,
        from: 200002, // 珠海分部
        is_to_child: 1,
    },
    {
        roleRelation_id: 40010,
        role_id: 300001, // 金融科技部-role
        type: ['dept_id', 200003], // 珠光集团运维组
        status: 1,
        default: 1,
        from: 200001, // 金融科技部
        is_to_child: 1,
    },
    {
        roleRelation_id: 40011,
        role_id: 300002, // 自动化开发-role
        type: ['dept_id', 200003], // 珠光集团运维组
        status: 1,
        default: 1,
        from: 200001, // 金融科技部
        is_to_child: 1,
    }
]
// 权限限制表
/*
    {
        roleAstrict_ID: 500000,
        type: ['dept_id', 200000], // dept_id, user_id, 是部门还是用户
        status: 1, // 最终使用, 1使用, 0不使用
        default: 1, // 默认权限, 1使用, 0不使用
        from: 0, // 继承关系, 如果是0, 则自己使用, 如果是部门ID, 则继承部门权限
        is_to_child: 0, // 是否给子级继承, 1继承, 0不继承
    }
*/
const roleAstrict = [
    {
        // roleAstrict_ID: 500000,
    }
]

// 创建部门
const createDept = (dept_name, parent_dept_id) => {
    // 1. 创建部门
    const dept_id = 200000 + departments.length + 1
    const dept_level = departments.find(item => item.dept_id == parent_dept_id).dept_level + 1 // 父级部门的 level + 1
    const dept = {
        dept_id,
        dept_name,
        dept_level,
        parent_dept_id,
    }
    departments.push(dept)
    let parent_id_array = []
    let bbm = parent_dept_id
    for (let i = 0; i < dept_level; i++) {
        console.log(bbm);
        let a = departments.find(item => item.dept_id == bbm)
        bbm = a
        console.log(a);
    }

}
createDept('格力项目组', 200002)
console.log('departments :>> ', departments, departmentParents);

// 查询部门的父级部门
const getDeptParents = (dept_id) => {
    // 1. 校验, departments 是否有 dept_id
    const dept = departments.find(item => item.dept_id === dept_id)
    const deptID = dept.dept_id
    const deptName = dept.dept_name
    const deptIDArray = [deptID]

    // 2. 查所有 dept_id 的父级部门
    // 在 departmentParents 遍历 dept_id === deptID 的所有 parent_id
    const parents = []
    departmentParents.find(item => {
        if (item.dept_id === deptID) {
            parents.push(item.parent_id)
        }
    })
    // 3. 通过 parents 去遍历 departments 中对应的 dept_id 的部门
    const deptParents = []
    parents.forEach(item => {
        departments.find(dept => {
            if (dept.dept_id === item) {
                deptParents.push(dept.dept_name)
            }
        })
    })
    console.log(deptName, '的父级部门是', deptParents);
}
// getDeptParents(200003)


// 关闭部门权限
const closeDeptPermission = (dept_id) => {
}

// 查询部门属性
const getPermission = (dept_id) => {
    // 校验, departments 是否有 dept_id
    const dept = departments.find(item => item.dept_id === dept_id)
    const deptID = dept.dept_id
    const deptIDArray = [deptID]

    // 1. 查所有 dept_id 的父级部门
    // 在 roleRelation 遍历 type[0] === 'dept_id' && type[1] === deptID 的所有 role_id
    const roleRelationDept = []
    roleRelation.find(item => {
        if (item.type[0] === 'dept_id' && item.type[1] === deptID) {
            roleRelationDept.push(item.role_id)
        }
    })

    // 2.通过roleRelationDept 去遍历 roles 中对应的 role_id 的权限
    const rolePermission = []
    roleRelationDept.forEach(item => {
        roles.find(role => {
            if (role.role_id === item) {
                rolePermission.push(role.permission)
            }
        })
    })
    // 解开 rolePermission
    const permission = []
    rolePermission.forEach(item => {
        item.forEach(item2 => {
            permission.push(item2)
        })
    })
    console.log('获取权限集合 :>>', permission);
}
// getPermission(200003)
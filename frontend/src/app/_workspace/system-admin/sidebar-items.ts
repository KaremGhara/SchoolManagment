import { RouteInfo } from '../../layout/sidebar/sidebar.metadata';
import { UserRole } from '../common-utils/classes/user-role';
export const AdminRoute: RouteInfo[] =[

  {
    path: '',
    title: 'Admin',
    moduleName: 'systemadmin',
    iconType: 'material-icons-two-tone',
    icon: 'school',
    class: 'menu-toggle',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    role: [UserRole[UserRole.Admin]],
    submenu: [],
  },
  {
    path: '/workspace/system-admin/all',
    title: 'Show Users',
    moduleName: 'systemadmin',
    iconType: 'material-icons-two-tone',
    icon: 'school',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [UserRole[UserRole.Admin]],
    submenu: [],
  },
  {
    path: '/workspace/system-admin/attachSchoolStaffToSchool',
    title: 'Attach Teacher',
    moduleName: 'systemadmin',
    iconType: 'material-icons-two-tone',
    icon: 'school',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [UserRole[UserRole.Admin]],
    submenu: [],
  },
  
]
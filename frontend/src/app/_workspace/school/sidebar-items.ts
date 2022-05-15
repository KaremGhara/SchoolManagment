import { RouteInfo } from '../../layout/sidebar/sidebar.metadata';
import { UserRole } from '../common-utils/classes/user-role';
export const schoolRoute: RouteInfo[] =[

  {
    path: '',
    title: 'Programs',
    moduleName: 'Programs',
    iconType: 'material-icons-two-tone',
    icon: 'school',
    class: 'menu-toggle',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    role: [UserRole[UserRole.MuncipalityManager],UserRole[UserRole.ProgramManager],UserRole[UserRole.SchoolStaff]],
    submenu: [
    
    ],
  },

 
]
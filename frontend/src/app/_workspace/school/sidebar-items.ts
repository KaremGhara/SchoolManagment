import { RouteInfo } from '../../layout/sidebar/sidebar.metadata';
import { UserRole } from '../common-utils/classes/user-role';
export const schoolRoute: RouteInfo[] =[

  {
    path: '',
    title: 'Schools',
    moduleName: 'school',
    iconType: 'material-icons-two-tone',
    icon: 'school',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [UserRole[UserRole.MuncipalityManager],UserRole[UserRole.ProgramManager],UserRole[UserRole.SchoolStaff]],
    submenu: [
      {
        path: '/workspace/school/all',
        title: 'Show schools',
        moduleName: 'school',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      {
        path: '/workspace/school/linkProgramsSchool',
        title: 'Link program to school',
        moduleName: 'school',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
      

    ],
  },
]
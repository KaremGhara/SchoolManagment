import { RouteInfo } from '../../layout/sidebar/sidebar.metadata';
import { UserRole } from '../common-utils/classes/user-role';
export const programManagerRoute: RouteInfo[] =[

  {
    path: '',
    title: 'Programs',
    moduleName: 'programmanager',
    iconType: 'material-icons-two-tone',
    icon: 'school',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [UserRole[UserRole.ProgramManager], UserRole[UserRole.MuncipalityManager]],
    submenu: [
      {
        
        
            path: '/workspace/program-manager/all',
            title: 'Show Programs',
            moduleName: 'program-manager',
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
import { RouteInfo } from '../../layout/sidebar/sidebar.metadata';
import { UserRole } from '../common-utils/classes/user-role';
export const MunicipalityManagerRoute: RouteInfo[] =[

  {
    path: '',
    title: 'Manage Schools',
    moduleName: 'micipalitymanager',
    iconType: 'material-icons-two-tone',
    icon: 'school',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: [UserRole[UserRole.MuncipalityManager]],
    submenu: [
      {
        
        
            path: '/workspace/mincipality-manager/allSchools',
            title: 'Show Schools',
            moduleName: 'micipalitymanager',
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
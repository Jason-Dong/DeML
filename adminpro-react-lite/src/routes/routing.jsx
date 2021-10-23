import Starter from '../views/starter/starter.jsx';
// ui components
import Alerts from '../views/ui-components/alert.jsx';
import Badges from '../views/ui-components/badge.jsx';
import Buttons from '../views/ui-components/button.jsx';
import Cards from '../views/ui-components/cards.jsx';
import DataVisualizer from '../views/ui-components/data.jsx';
import LayoutComponent from '../views/ui-components/layout.jsx';
import PaginationComponent from '../views/ui-components/pagination.jsx';
import PopoverComponent from '../views/ui-components/popover.jsx';
import TooltipComponent from '../views/ui-components/tooltip.jsx';
import UploadComponent from '../views/ui-components/upload.jsx';

var ThemeRoutes = [
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    icon: 'mdi mdi-gauge', 
    component: Starter 
  },
  {
    path: '/ui-components/upload',
    name: 'Upload Model',
    icon: 'mdi mdi-image-filter-vintage',
    component: UploadComponent
  },
  {
    path: '/ui-components/data',
    name: 'Data Visualizer',
    icon: 'mdi mdi-image-filter-vintage',
    component: DataVisualizer
  },
  { path: '/', pathTo: '/dashboard', name: 'Dashboard', redirect: true }
];
export default ThemeRoutes;
import { ComponentType } from "react";
import { SvgIconProps } from '@mui/material';
import FriendsIcon from '@mui/icons-material/Diversity3';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PeopleIcon from '@mui/icons-material/People';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import CodeIcon from '@mui/icons-material/Code';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BlockIcon from '@mui/icons-material/Block';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SafetyDividerIcon from '@mui/icons-material/SafetyDivider';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import EditIcon from '@mui/icons-material/Edit';
import ReplayIcon from '@mui/icons-material/Replay';
import StarRateIcon from '@mui/icons-material/StarRate';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupsIcon from '@mui/icons-material/Groups';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type app = "Friends" | "MeetingRoom" | "Logout";
type pageLayout = "Menu" | "AngleBracketLeft" | "AngleBracketRight";
type interesting = "Photography" | "Travel" | "Coding";
type communication = "Phone" | "Email" | "WWW" | "Communication" | "PrivateCommunication";
type partnerMng = "PartnerList" | "EmailUnread" | "BanndedList"  |
                  "PersonAdd" | "Block" | "Back" | "Star" | 
                  "Recover" | "Account" | "Notifications";
type chatroomMng = "Leave" | "Explore" | "MyFavorite" | "Groups";
type uiControl = "Close" | "Expand" | "Collapse" | 
                 "AddBox" | "Edit" | "Delete" | "Attachment" |
                 "Search" | "More" | "Settings" | "Add" | "Minus" |
                 "Visible" | "Invisible";

//Limit the icon type domain
export type IconType = app | pageLayout | interesting | 
                       communication | partnerMng | chatroomMng | uiControl;

// Static map of icons
const IconMap: Record<IconType, ComponentType<SvgIconProps>>= {
  Friends: FriendsIcon,
  MeetingRoom: MeetingRoomIcon,
  Logout: LogoutIcon,
  Menu: MenuIcon,
  AngleBracketLeft: ChevronLeftIcon,
  AngleBracketRight: ChevronRightIcon,
  PartnerList: PeopleIcon,
  EmailUnread: MarkAsUnreadIcon,
  BanndedList: NotInterestedIcon,
  Photography: CameraAltIcon,
  Travel: ModeOfTravelIcon,
  Coding: CodeIcon,
  Phone: PhoneIcon,
  Email: EmailIcon,
  WWW: LanguageIcon,
  PersonAdd: PersonAddIcon,
  Block: BlockIcon,
  Back: ArrowBackIcon,
  Close: CloseIcon,
  Expand: ExpandMore,
  Collapse: ExpandLess,
  Delete: DeleteForeverIcon,
  Attachment: AttachFileIcon,
  AddBox: AddBoxIcon,
  Communication: SafetyDividerIcon,
  PrivateCommunication: SyncLockIcon,
  Leave: ExitToAppIcon,
  Explore: TravelExploreIcon,
  MyFavorite: FavoriteIcon,
  Groups: GroupsIcon,
  Edit: EditIcon,
  Star: StarRateIcon,
  Recover: ReplayIcon,
  Search: SearchIcon,
  More: MoreIcon,
  Account: AccountCircle,
  Notifications: NotificationsIcon,
  Settings: SettingsIcon,
  Add: AddIcon,
  Minus: RemoveIcon,
  Visible: Visibility,
  Invisible: VisibilityOff
};

// Component to handle async loading with caching
export const IconProxy = ({ iconName, ...restProps }: SvgIconProps & { iconName: IconType}) => {
  const IconComponent = IconMap[iconName]
  return <IconComponent {...restProps} />;
}
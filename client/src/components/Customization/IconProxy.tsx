import { ComponentType } from "react";
import { SvgIconProps } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import CodeIcon from '@mui/icons-material/Code';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BlockIcon from '@mui/icons-material/Block';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SafetyDividerIcon from '@mui/icons-material/SafetyDivider';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import EditIcon from '@mui/icons-material/Edit';


type interesting = "Photography" | "Travel" | "Coding";
type communication = "Phone" | "Email" | "WWW" | "Communication";
type partnerMng = "PersonAdd" | "Block" | "Back";
type chatroomMng = "Leave";
type uiControl = "Expand" | "Collapse" | "AddBox" | "Edit" | "Delete" | "Attachment";

//Limit the icon type domain
export type IconType = interesting | communication | partnerMng | chatroomMng | uiControl;

// Static map of icons
const IconMap: Record<IconType, ComponentType<SvgIconProps>>= {
  Photography: CameraAltIcon,
  Travel: ModeOfTravelIcon,
  Coding: CodeIcon,
  Phone: PhoneIcon,
  Email: EmailIcon,
  WWW: LanguageIcon,
  PersonAdd: PersonAddIcon,
  Block: BlockIcon,
  Back: ArrowBackIcon,
  Expand: ExpandMore,
  Collapse: ExpandLess,
  Delete: DeleteForeverIcon,
  Attachment: AttachFileIcon,
  AddBox: AddBoxIcon,
  Communication: SafetyDividerIcon,
  Leave: ExitToAppIcon,
  Edit: EditIcon
};

// Component to handle async loading with caching
export const IconProxy = ({ iconName, ...restProps }: SvgIconProps & { iconName: IconType}) => {
  const IconComponent = IconMap[iconName]
  return <IconComponent {...restProps} />;
}
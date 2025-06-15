
import { BookOpen, PenSquare, FileText, Users } from "lucide-react";

interface TabIconMap {
  [key: string]: { Icon: React.ElementType, label: string };
}

export const userStoryTabIcons: TabIconMap = {
  guide:   { Icon: BookOpen,    label: "Guide" },
  builder: { Icon: PenSquare,   label: "Builder" },
  templates: { Icon: FileText,  label: "Templates" },
  stories: { Icon: Users,       label: "My Stories" },
};

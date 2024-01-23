import React, { FC, useState } from "react";
import { useWorkout } from "@app/zustand/workoutStore";
import { MenuOption } from "@app/types/general";
import BaseMenu from "../core/menus/BaseMenu";
import IconButton from "../core/IconButton";

interface TemplateMenuOptionsProps {
  templateId: string;
}

const TemplateMenuOptions: FC<TemplateMenuOptionsProps> = ({ templateId }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const deleteTemplate = useWorkout((s) => s.deleteWorkout);
  const duplicateTemplate = useWorkout((s) => s.createTemplate);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const sampleOptions: Array<MenuOption> = [
    {
      title: "Edit",
      onPress: () => {

      },
      leadingIcon: "pencil"
    },
    {
      title: "Duplicate",
      onPress: () => {
        // Maybe open a new template screen to edit this template
        duplicateTemplate(templateId, "copy");
        toggleMenu();
      },
      leadingIcon: "content-paste",
    },
    {
      title: "Delete",
      onPress: () => {
        deleteTemplate(templateId, true);
      },
      leadingIcon: "delete",
    },
  ];
  return (
    <BaseMenu
      visible={menuOpen}
      options={sampleOptions}
      onDismiss={toggleMenu}
      anchor={<IconButton icon="dots-vertical" onPress={toggleMenu} />}
    />
  );
};

export default TemplateMenuOptions;

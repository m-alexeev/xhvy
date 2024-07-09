import { create } from "zustand";
import { produce } from "immer";
import { persist } from "zustand/middleware";
import { TemplateStoreType } from "@app/types/store";
import { Template } from "@app/types/templates";
import uuid from "react-native-uuid";
import { CustomStorage } from "./customStorage";

const useTemplates = create<TemplateStoreType>()(
  persist((set) => ({
    templates: {},
    createTemplate: (
      templateId: Template["id"],
      mode: "new" | "copy" = "new",
    ) =>
      set(
        produce((state: TemplateStoreType) => {
          if (mode === "new") {
            const template: Template = {
              id: templateId,
              name: "New Template",
              exercises: {},
              template: true,
              wip: true,
            };
            state.templates[template.id] = template;
          }
          if (mode === "copy") {
            const newTemplate = { ...state.templates[templateId] };
            newTemplate.id = uuid.v4().toString();
            state.templates[newTemplate.id] = newTemplate;
          }
        }),
      ),
    saveTemplate: (template: Template) =>
      set(
        produce((state: TemplateStoreType) => {
          // Deletes the wip tag that will mark the template as saved
          state.templates[template.id] = template;
        }),
      ),
  }), {
    name: "template-storage",
    storage: CustomStorage<TemplateStoreType>(),
  }),
);

export { useTemplates };

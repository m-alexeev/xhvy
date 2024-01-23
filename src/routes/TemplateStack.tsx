import React, { FC } from "react";
import { TemplateStack } from "./stacks";
import TemplateHomePage from "@app/pages/templates/TemplateViewPage";
import Header from "@app/components/core/Header";
import TemplateCreatePage from "@app/pages/templates/TemplateCreatePage";

const TemplateStackRouter: FC = () => {
  return (
    <TemplateStack.Navigator>
      <TemplateStack.Screen
        name="View"
        component={TemplateHomePage}
        options={{
          header: () => {
            return <Header title="Templates" />;
          },
        }}
      />
      <TemplateStack.Screen
        name="Create"
        component={TemplateCreatePage}
        options={{
        }}
      />
    </TemplateStack.Navigator>
  );
};

export default TemplateStackRouter;

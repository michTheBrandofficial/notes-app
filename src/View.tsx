import { Notification, SettingsLayer, Sidebar, Spinner } from "@/components/ui";
import Body from "@/pages/body";
import Form from "@/pages/form";
import Settings from "@/pages/settings";
import Trash from "@/pages/trash";
import { Suspense } from "nixix/hoc";
import { effect } from "nixix/primitives";
import { VStack } from "nixix/view-components";
import tasks from "~/utils/tasks";

class View extends SettingsLayer {
  constructor() {
    super()
    this.setupThemeEffect()
    this.showPageFromRoute()
  }

  setupThemeEffect() {
    effect(() => {
      const theme = this.settings?.["theme mode"]?.toLowerCase();
      document.body.classList.add(theme || "light");
    });
  }

  showPageFromRoute() {
    effect(() => {
      const url = new URL(window.location.href);
      const task = url.searchParams.get("task") as Shortcuts;
      tasks[task]?.();
    })
  }

  jsx(): someView {

    return (
      <VStack className={"w-screen h-screen relative overflow-clip lg:flex"}>
        <Sidebar />
        <Suspense fallback={<Spinner.Page />} >
          <Body />
          <Settings />
          <Trash />
          <Notification />
        </Suspense>
        <Form />
      </VStack>
    );
  }

}

export default View;

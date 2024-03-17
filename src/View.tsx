import SettingsLayer from "@/components/SettingsLayer";
import Sidebar from "@/components/Sidebar";
import { Notification } from "@/components/display";
import Body from "@/pages/Body";
import Form from "@/pages/Form";
import Settings from "@/pages/Settings";
import Trash from "@/pages/Trash";
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

  sideBarState = View.State<boolean>(false)

  jsx(): JSX.ElementType {
    const [sidebar, setSidebar] = [this.sideBarState.get(), this.sideBarState.set]

    return (
      <VStack className={"w-screen h-screen relative overflow-clip lg:flex"}>
        <Sidebar {...{ sidebar, setSidebar }} />
        <Suspense fallback={'I am a fallback'} >
          <Body toggleMenu={[sidebar, setSidebar]} />
          <Notification />
          <Settings />
          <Trash />
        </Suspense>
        <Form />
      </VStack>
    );
  }

}

export default View;

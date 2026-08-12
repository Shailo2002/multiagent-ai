import NewChatbox from "../components/NewChatbox";
import Sidebar from "../components/workspace/Sidebar";
import { useSelector } from "react-redux";

function WorkspacePage() {
  const userData = useSelector((state) => state.user.userData);

  return (
    <div className="bg-canvas text-text flex h-screen w-full overflow-hidden">
      <Sidebar userData={userData} />

      <main className="min-w-0 flex-1 overflow-y-auto">
        <NewChatbox />
      </main>
    </div>
  );
}

export default WorkspacePage;

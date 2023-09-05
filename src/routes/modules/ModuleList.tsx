import { mockModuleData, mockUserData } from "../../mockdata.ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card.tsx";
import { Button } from "../../../components/ui/button.tsx";
import { Link } from "react-router-dom";
import { Avatar } from "../../../components/ui/avatar.tsx";
import { BsDiscord } from "react-icons/bs";

export default function ModuleListPage() {
  const users = mockUserData;
  return (
    <>
      <h1 className="text-4xl font-bold mb-3">Modules</h1>
      <div className="grid grid-cols-3 gap-3">
        {mockModuleData.map((module) => (
          <Card key={module.Module_id}>
            <CardHeader>
              <CardTitle>
                <Link to={`/module/${module.Module_id}`}>
                  {module.Module_name}
                </Link>
              </CardTitle>
              <CardDescription>{module.Module_shortdesc}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <div className="flex items-center gap-2 mr-2">
                <BsDiscord className="mr-1 h-4 w-4" />@
                {module.users.User_displayname}
              </div>
              <div className="flex gap-2">
                <Link to={`/module/${module.Module_id}`}>
                  <Button variant="outline">View</Button>
                </Link>
                {/* TODO: only show latest version for either author or moderators if latest version is not approved, otherwise show the latest version that is approved */}
                <Button>Download {module.versions.filter((version) => true)[0].Version_v_number}</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

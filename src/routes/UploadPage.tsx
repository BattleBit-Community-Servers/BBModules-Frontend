import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ModuleData } from "../../api/modules.types.ts";

export default function UploadPage() {
    const [loading, setLoading] = useState(false);
    const [binaryDependencies, setBinaryDependencies] = useState<{ name: string }[]>([]);
    const [newBinaryDependency, setNewBinaryDependency] = useState("");
    const [file, setFile] = useState(null as any);
    const [errorMessage, setErrorMessage] = useState("");
    const [changelog, setChangelog] = useState("");
    const navigate = useNavigate();

    const addDependency = () => {
        if (!newBinaryDependency) return;

        setBinaryDependencies([...binaryDependencies, { name: newBinaryDependency }]);
        setNewBinaryDependency("");
    };

    const removeDependency = (index: number) => {
        const newDependencies = [...binaryDependencies];
        newDependencies.splice(index, 1);
        setBinaryDependencies(newDependencies);
    };

    const handleDependencyChange = (index: number, event: any) => {
        const newDependencies = [...binaryDependencies];
        newDependencies[index].name = event.target.value;
        setBinaryDependencies(newDependencies);
    };

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setErrorMessage("");

        let dependencies = binaryDependencies;
        if (newBinaryDependency) {
            dependencies = [...binaryDependencies, { name: newBinaryDependency }];
        }

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("binary_dependencies", JSON.stringify(dependencies));
            formData.append("changelog", changelog);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/Modules/AddModule`, {
                method: "POST",
                body: formData,
                credentials: "include"
            });

            if (response.ok) {
                const data = (await response.json()) as ModuleData;
                navigate(`/module/${data.Module_id}`, { replace: true });
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message.replace(/\n/g, "<br>"));
            }
        } catch (error) {
            setErrorMessage("An error occurred while uploading the module.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="mb-3 text-4xl font-bold">Upload a module</h1>
            <p className="mb-4 text-lg font-normal text-gray-400">
                You can utilize this section to upload a new module to our repository or submit a new version of an
                existing module for updates
            </p>

            <section className="mb-4">
                <h2 className="text-2xl font-bold">Binary dependencies</h2>
                <p className="mb-2 text-lg font-normal text-gray-400">
                    If your module relies on any binary dependencies, please specify them in the fields below. Use a
                    separate field for each dependency.
                </p>

                <ul className="space-y-2">
                    {binaryDependencies.map((dependency, index) => (
                        <li key={index} className="flex items-center space-x-2">
                            <Input
                                type="text"
                                value={dependency.name}
                                onChange={(e) => handleDependencyChange(index, e)}
                                className="w-full rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring"
                            />
                            <Button
                                onClick={() => removeDependency(index)}
                                className="w-10 rounded-md bg-red-500 p-2 text-white hover:bg-red-600 focus:outline-none"
                            >
                                -
                            </Button>
                        </li>
                    ))}

                    <li className="flex items-center space-x-2">
                        <Input
                            type="text"
                            value={newBinaryDependency}
                            onChange={(e) => setNewBinaryDependency(e.target.value)}
                            className="w-full rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring"
                        />
                        <Button
                            onClick={() => addDependency()}
                            className="w-10 rounded-md bg-green-600 p-2 text-white hover:bg-green-700 focus:outline-none"
                        >
                            +
                        </Button>
                    </li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-2xl font-bold">Changelog</h2>
                <p className="mb-2 text-lg font-normal text-gray-400">
                    Please provide a detailed changelog for this version of the module. Leaving this section blank will
                    result in the changelog being set to "Initial upload" for new modules or "No changelog provided" for
                    existing ones.
                </p>
                <p className="my-2 flex items-center text-yellow-500">
                    Note: Only images hosted on imgur are allowed. HTML is not allowed.
                </p>
                <MDEditor
                    value={changelog}
                    onChange={(value) => {
                        setChangelog(value || "");
                    }}
                    previewOptions={{
                        rehypePlugins: [[rehypeSanitize]]
                    }}
                />
            </section>

            <section className="mb-4">
                <h2 className="text-2xl font-bold">Module file</h2>
                <p className="mb-2 text-lg font-normal text-gray-400">
                    Place your module .cs file here to upload it to the repository. It will be validated to check for
                    compile-time errors, if there are no binary dependencies. Afterwards it will await approval by a
                    moderator.
                </p>

                <Input type="file" onChange={handleFileChange} className="cursor-pointer file:text-white" />
            </section>

            <Button onClick={handleSubmit} disabled={loading}>
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </>
                ) : (
                    <>Upload</>
                )}
            </Button>

            {errorMessage && <div className="text-red-500" dangerouslySetInnerHTML={{ __html: errorMessage }} />}
        </>
    );
}

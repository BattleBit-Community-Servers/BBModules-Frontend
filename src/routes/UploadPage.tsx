import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

export default function UploadPage() {
    const [loading, setLoading] = useState(false);
    const [binaryDependencies, setBinaryDependencies] = useState([
        { name: "" },
    ]);
    const [file, setFile] = useState(null as any);
    const [errorMessage, setErrorMessage] = useState("");
    const [moduleId, setModuleId] = useState(null as number | null);
    const [changelog, setChangelog] = useState("");

    const addDependency = () => {
        setBinaryDependencies([...binaryDependencies, { name: "" }]);
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

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append(
                "binary_dependencies",
                JSON.stringify(binaryDependencies)
            );
            formData.append("changelog", changelog);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/Modules/AddModule`, {
                method: "POST",
                body: formData,
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setModuleId(data.Module_id);
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

    if (moduleId) {
        window.location.href = `/module/${moduleId}`;
    }

    return (
        <>
            <h1 className="text-4xl font-bold mb-3">Upload a module</h1>
            <p className="text-lg font-normal text-gray-400">
                Upload a new module to the repository or upload a new version of
                one of your existing modules to update it.
            </p>
            <h2 className="text-2xl font-bold mb-3">Binary dependencies</h2>
            <p className="text-lg font-normal text-gray-400">
                If your module depends on any binaries, you can specify them
                here. Use one field per dependency.
            </p>
            {binaryDependencies.map((dependency, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <Input
                        type="text"
                        value={dependency.name}
                        onChange={(e) => handleDependencyChange(index, e)}
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <Button
                        onClick={() => removeDependency(index)}
                        className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600 focus:outline-none"
                    >
                        -
                    </Button>
                </div>
            ))}
            <Button
                onClick={addDependency}
                className="bg-green-500 text-white rounded-md p-2 hover:bg-green-600 focus:outline-none"
            >
                +
            </Button>
            <h2 className="text-2xl font-bold mb-3">Changelog</h2>
            <p className="text-lg font-normal text-gray-400">
                Provide a changelog for this version of the module. If you leave
                this blank, the changelog will be set to "Initial upload" for
                new modules, or "No changelog provided" for existing modules.
            </p>
            <MDEditor
                value={changelog}
                onChange={(value) => {
                    setChangelog(value || "");
                }}
                previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                }}
            />
            <h2 className="text-2xl font-bold mb-3">Module file</h2>
            <p className="text-lg font-normal text-gray-400">
                Place your module .cs file here to upload it to the repository.
                It will be validated to check for compile-time errors, if there
                are no binary dependencies. Afterwards it will await approval by
                a moderator.
            </p>
            <input
                type="file"
                onChange={handleFileChange}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
            />
            <Button
                onClick={handleSubmit}
                className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 focus:outline-none"
            >
                Upload
            </Button>
            {loading ? (
                <div
                    className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
                    role="status"
                    aria-label="loading"
                >
                    <span className="sr-only">Uploading and validating...</span>
                </div>
            ) : null}
            {errorMessage && (
                <div
                    className="text-red-500"
                    dangerouslySetInnerHTML={{ __html: errorMessage }}
                ></div>
            )}
        </>
    );
}

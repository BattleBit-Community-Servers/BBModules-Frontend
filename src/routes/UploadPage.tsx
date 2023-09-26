import { ChangeEvent, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ModuleData } from "../../api/modules.types.ts";
import { SanitizedMarkdown } from "../components/common/sanitized-markdown.tsx";

export default function UploadPage() {
    const [loading, setLoading] = useState(false);
    const [binaryDependencies, setBinaryDependencies] = useState<{ name: string }[]>([]);
    const [newBinaryDependency, setNewBinaryDependency] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [changelog, setChangelog] = useState("");
    const navigate = useNavigate();

    const fileInput = useRef<HTMLInputElement>(null);

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

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            setFile(null);
            return;
        }

        console.log(event.target.files[0].name);

        setFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setErrorMessage("");
        if (!file) {
            setErrorMessage("Please select a file to upload.");
            setLoading(false);
            return;
        }

        let dependencies = binaryDependencies;
        if (newBinaryDependency) {
            dependencies = [...binaryDependencies, { name: newBinaryDependency }];
        }

        // deduplicate dependencies
        dependencies = dependencies
            .filter((dependency) => dependency.name !== "")
            .filter((dependency, index, self) => self.findIndex((d) => d.name === dependency.name) === index);

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
                setFile(null);
                if (fileInput.current) fileInput.current.value = "";
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
                <p className="my-2 flex items-center text-amber-500">
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

                {errorMessage && <p className="text-amber-500">We've removed the file from the file selector!</p>}
                <Input
                    ref={fileInput}
                    type="file"
                    onChange={handleFileChange}
                    className="cursor-pointer file:text-white"
                />
            </section>

            <div className="flex items-center gap-2">
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

                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>

            <SanitizedMarkdown markdown="# Module Submission Guidelines and Safety Measures
## 1. Data Privacy and Telemetry:
Do Not Collect Personal User Data: Your module must not collect or transmit any personal user data to external servers or third-party sources without explicit user consent. This includes any form of telemetry that identifies individual users.
## 2. Malicious Activities:
No Malicious Intent: Modules must not engage in any malicious activities, including but not limited to stealing user data, injecting harmful code, or compromising system security.  
No Data Theft: Your module must not attempt to steal sensitive information, passwords, or personal data from users.
## 3. External Code Execution:
No Untrusted External Code: Do not create modules that execute code from external or untrusted sources. This includes code injection, dynamic loading of scripts, or any action that can introduce security vulnerabilities.
## 4. Mining or Unauthorized Activities:
No Cryptocurrency Mining: Modules must not mine cryptocurrency or engage in any unauthorized activities that consume user resources without consent.
## 5. Compliance with Laws and Regulations:
Follow Legal Guidelines: Ensure that your module complies with all applicable laws and regulations, including copyright and intellectual property laws.
## 6. Transparent Functionality:
Clearly Documented Purpose: Clearly document the purpose and functionality of your module in its documentation. Users should have a clear understanding of what the module does and how it affects their experience.  
Transparency and Verification: Code obfuscation techniques that deliberately obscure the functionality of your module are not allowed. Your module's code should be transparent and easily understandable to ensure the safety and trust of our community.
## 7. Avoiding Unnecessary Access:
Minimize Permissions: Your module should only provide functionality to the necessary permissions and access levels. Unnecessary access can raise concerns and affect user trust.
## 8. Thorough Testing:
Minimize Bugs: Thoroughly test your module to identify and fix any bugs or unintended behavior before submission.  
Version Spam: Do not spam submissions with lots of small version updates to fix bugs.
## 9. Continuous Improvement:
Regular Maintenance: Keep your module up-to-date and responsive to user feedback. Address issues and make improvements promptly.
## 10. Zero Tolerance for Harmful Modules:
Immediate Removal: We have a zero-tolerance policy for modules that violate these guidelines or pose a security risk. Any module found to be harmful will be removed immediately.
## 11. Reporting Violations:
Community Responsibility: If you come across a module that violates these guidelines or poses a security concern, please report it to our staff immediately by sending a DM to ModMail.
## 12. Offering Assistance:
User Interaction: As users engage with your modules, they may have inquiries or encounter issues. To facilitate communication, users might tag you in the #module-help channel.  
Supportive Involvement: When users seek assistance, we encourage you to actively engage and provide support for your modules. Your willingness to assist is greatly valued and contributes to the positive experience of our community.

**By submitting a module, you acknowledge that you have read, understood, and agree to adhere to these guidelines and safety measures. Your contribution plays a vital role in maintaining the security and quality of our platform.**

Thank you for your dedication to our community's well-being and for helping us create a safe and valuable environment for all users." />
        </>
    );
}

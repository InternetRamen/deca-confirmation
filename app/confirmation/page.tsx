"use client";
import { Inter } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const id = useSearchParams().get("id");
    if (!id) return <div className="w-screen h-screen"> 404 </div>;
    const [name, setName] = useState("");
    return (
        <main className="w-screen h-screen">
            <div className="max-w-3xl w-11/12 mx-auto flex flex-col items-center">
                <h1 className="text-3xl">DECA Membership Confirmation</h1>
                <p>
                    By entering your name into the field below, you are
                    confirming that you commit to joining DECA and will{" "}
                    <span className="font-bold">
                        pay your $20 dollar membership
                    </span>{" "}
                    due fee.
                    <br />
                    Make sure to capitalize and space your name correctly.
                </p>
                <div className="space-x-2">
                    <label>Full Name</label>
                    <input
                        type="text"
                        className="border-2 border-black p-2"
                        value={name}
                        placeholder="ex. John Doe"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <button
                        className="border-2 border-black p-2 rounded"
                        onClick={() => {
                            fetch("/api/confirm", {
                                method: "POST",
                                body: JSON.stringify({
                                    name,
                                    id,
                                }),
                            }).then((res) => {
                                if (res.status === 200) {
                                    alert("Success! You can close the tab.");
                                } else if (res.status === 404) {
                                    alert("Error: Invalid ID");
                                } else if (res.status === 400) {
                                    alert("Error: Incorrect Name");
                                } else if (res.status === 409) {
                                    alert("Error: Already Confirmed");
                                }
                            });
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </main>
    );
}

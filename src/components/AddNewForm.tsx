"use client";

import { addCompany, addContact, Company, Contact } from "@/utils/api";
import { CompanyFields, ContactFields, FieldConfig } from "@/utils/fields";
import Link from "next/link";
import { useEffect, useState } from "react";

export const AddNewForm = () => {
    const [activeTab, setActiveTab] = useState<"companies" | "contacts">(
        "companies"
    );

    const [newThing, setNewThing] = useState<Company | Contact | null>();

    useEffect(() => {
        setNewThing(null);
    }, [activeTab]);

    return (
        <div className="p-2">
            <div className="flex flex-row  w-fit mx-auto mb-2">
                <div
                    className={`rounded-l-full border-r-0 border border-gray-400 py-1 pl-4 pr-3 cursor-pointer ${
                        activeTab === "companies" ? "bg-black text-white" : ""
                    }`}
                    onClick={() => setActiveTab("companies")}
                >
                    New Company
                </div>
                <div
                    className={`rounded-r-full border-l-0 border border-gray-400 py-1 pr-4 pl-3 cursor-pointer ${
                        activeTab === "contacts" ? "bg-black text-white" : ""
                    }`}
                    onClick={() => setActiveTab("contacts")}
                >
                    New Contact
                </div>
            </div>
            {activeTab === "companies" && (
                <Form
                    fields={CompanyFields}
                    onCreate={async (v) => {
                        const newCompany = await addCompany(v);
                        setNewThing(newCompany);
                    }}
                />
            )}
            {activeTab === "contacts" && (
                <Form
                    fields={ContactFields}
                    onCreate={async (v) => {
                        const newContact = await addContact(v);
                        setNewThing(newContact);
                    }}
                />
            )}
            {newThing && (
                <div className="w-full text-center py-4">
                    <span className="font-bold text-green-600">Saved.</span>
                    <br></br>
                    <Link
                        className="underline"
                        href={`/${activeTab}/${newThing.id}`}
                    >
                        View page
                    </Link>
                </div>
            )}
        </div>
    );
};

const getDefaultState = (fields: FieldConfig[]) => {
    const state: any = {};
    fields.forEach((f) => {
        if (f.type === "number") {
            state[f.field] = 0;
        } else {
            state[f.field] = "";
        }
    });
    return state;
};

const Form = ({
    fields,
    onCreate,
}: {
    fields: FieldConfig[];
    onCreate: (v: any) => any;
}) => {
    const [formData, setFormData] = useState<any>(getDefaultState(fields));

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        let parsedValue = value;
        const fieldConfig = fields.find((f) => f.field === name);
        // TODO: validation?
        if (fieldConfig?.type === "number") {
            parsedValue = Number(value);
        }
        setFormData({
            ...formData,
            [name]: parsedValue,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const toSubmit = { ...formData };
        // validate domain names!
        Object.keys(formData).forEach((k) => {
            const field = fields.find((f) => f.field === k);
            if (field?.values && !field.values.includes(toSubmit[k])) {
                toSubmit[k] = null;
            }
        });
        onCreate(toSubmit);
        setFormData(getDefaultState(fields));
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {fields.map((field) => (
                <div key={field.field} className="flex flex-col gap-1">
                    <label
                        htmlFor={field.field}
                        className="text-sm text-gray-500"
                    >
                        {field.name}
                    </label>
                    {field.values ? (
                        <select
                            id={field.field}
                            name={field.field}
                            value={formData[field.field]}
                            onChange={handleChange}
                            className="w-fit px-2 py-0.5 border border-gray-500 rounded-lg"
                        >
                            <option value="">Select {field.name}</option>
                            {field.values.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={field.type || "text"}
                            id={field.field}
                            name={field.field}
                            value={formData[field.field]}
                            onChange={handleChange}
                            className="px-2 py-0.5 w-full border border-gray-500 rounded-lg"
                        />
                    )}
                </div>
            ))}
            <button
                type="submit"
                className="border border-black rounded-lg px-2 py-0.5 mt-8"
            >
                Submit
            </button>
        </form>
    );
};

"use client";

import { Suspense, use, useCallback, useEffect, useState } from "react";

export async function getAllData(table: "companies" | "contacts") {
    const response = await fetch(`http://localhost:3000/api/${table}`, {
        cache: "no-cache",
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
}

export const addCompany = () => {
    fetch("http://localhost:3000/api/companies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify({ name: companyName }),
    });
};

const CompanyList = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        if (data.length === 0) {
            setLoading(true);
        }
        const newData = await getAllData("companies");
        setData(newData);
        setLoading(false);
    }, [data]);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 15000); // Poll every 5 seconds
        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);
    return (
        <div>
            {loading && <div>Loading...</div>}
            {data.length > 0 && (
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2" key="header">
                        {Object.keys(data[0]).map((key) => (
                            <div key={key}>{key}</div>
                        ))}
                    </div>
                    {data.map((record: any, index: number) => (
                        <div key={index} className="flex flex-row gap-2">
                            {Object.values(record).map((value: any, i) => (
                                <div key={i}>{value}</div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const Home = () => {
    return (
        <div>
            <h1>It's the app</h1>
            <button
                className="py-1 px-4 border border-gray-500 rounded-full"
                onClick={addCompany}
            >
                add company
            </button>
            <Suspense fallback={<p>Loading...</p>}>
                <CompanyList />
            </Suspense>
        </div>
    );
};

export default Home;

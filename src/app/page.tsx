// lib/fetchAirtableData.js

import { Suspense, use } from "react";

export async function fetchAirtableData() {
    const response = await fetch("http://localhost:3000/api/companies", {
        cache: "no-cache",
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
}

const CompanyList = () => {
    const data = use(fetchAirtableData());
    return (
        <Suspense fallback={<p>Loading...</p>}>
            {data.length === 0 ? (
                <p>No data available</p>
            ) : (
                <div>
                    <thead>
                        <tr>
                            {Object.keys(data[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((record: any, index: number) => (
                            <tr key={index}>
                                {Object.values(record).map((value: any, i) => (
                                    <td key={i}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </div>
            )}
        </Suspense>
    );
};

const Home = () => {
    return (
        <div>
            <h1>It's the app</h1>
            <Suspense fallback={<p>Loading...</p>}>
                <CompanyList />
            </Suspense>
        </div>
    );
};

export default Home;

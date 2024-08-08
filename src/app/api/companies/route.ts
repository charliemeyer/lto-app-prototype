import Airtable from "airtable";
import { NextRequest, NextResponse } from "next/server";

const { AIRTABLE_API_TOKEN, AIRTABLE_BASE_ID } = process.env;
const base = new Airtable({ apiKey: AIRTABLE_API_TOKEN }).base(
    AIRTABLE_BASE_ID!
);

export async function GET(req: Request) {
    try {
        const data = await new Promise((resolve, reject) => {
            base("Companies")
                .select({})
                .all((err, records) => {
                    if (err) {
                        console.error(
                            "Error retrieving records from the company table:",
                            err
                        );
                        reject(err);
                    } else {
                        const data = (records || []).map((record) => ({
                            ...record.fields,
                            id: record.id,
                        }));
                        resolve(data);
                    }
                });
        });
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        return new Response(
            JSON.stringify({ error: "Unexpected error occurred" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}

export async function POST(req: Request) {
    const fields = await req.json();

    try {
        const record = await new Promise((resolve, reject) => {
            base("Companies").create(fields, (err: any, record: any) => {
                if (err) {
                    console.error(
                        "Error adding row to the company table:",
                        err
                    );
                    reject(err);
                } else {
                    console.log("Row added successfully with ID:", record?.id);
                    resolve(record);
                }
            });
        });
        return new Response(JSON.stringify(record), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        return new Response(
            JSON.stringify({ error: "Unexpected error occurred" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}

export async function PATCH(req: NextRequest, res: NextResponse) {
    try {
        const { id, ...fieldsToUpdate } = await req.json();

        if (!id) {
            console.error("No id provided");
            return new Response(JSON.stringify({ error: "No id provided" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const record = await new Promise((resolve, reject) => {
            base("Companies").update(
                id,
                fieldsToUpdate,
                (err: any, record: any) => {
                    if (err) {
                        3;
                        console.error(
                            "Error updating row in the company table:",
                            err
                        );
                        reject(err);
                    } else {
                        console.log(
                            "Row updated successfully with ID:",
                            record?.id
                        );
                        resolve(record);
                    }
                }
            );
        });
        return Response.json(record);
    } catch (error) {
        console.error("Unexpected error:", error);
        return Response.error();
    }
}

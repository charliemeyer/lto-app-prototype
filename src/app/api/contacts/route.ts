import Airtable from "airtable";

const { AIRTABLE_API_TOKEN, AIRTABLE_BASE_ID } = process.env;
const base = new Airtable({ apiKey: AIRTABLE_API_TOKEN }).base(
    AIRTABLE_BASE_ID!
);

export async function GET(req: Request, res: Response) {
    try {
        const records = await base("Contacts").select({}).all();
        const data = records.map((record) => ({
            ...record.fields,
            id: record.id,
        }));

        return Response.json(data);
    } catch (error) {
        console.error(error);
    }
}

export async function POST(req: Request, res: Response) {
    base("Contacts").create({ Name: "Person " + Date.now() }, (err, record) => {
        if (err) {
            console.error("Error adding row to the contacts table:", err);
        }

        console.log("Row added successfully with ID:", record?.id);
        return res.ok;
    });
}

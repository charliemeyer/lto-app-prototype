import Airtable from "airtable";

const { AIRTABLE_API_TOKEN, AIRTABLE_BASE_ID } = process.env;
const base = new Airtable({ apiKey: AIRTABLE_API_TOKEN }).base(
    AIRTABLE_BASE_ID!
);

export async function GET(req: Request, res: Response) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
        const records = await base("Companies").select({}).all();
        const data = records.map((record) => record.fields);

        return Response.json(data);
    } catch (error) {
        console.error(error);
    }
}

export async function POST(req: Request, res: Response) {
    base("Companies").create(
        { Name: "Company " + Date.now() },
        (err, record) => {
            if (err) {
                console.error("Error adding row to the company table:", err);
                return res.ok;
            }

            console.log("Row added successfully with ID:", record?.id);
        }
    );
}

import Airtable from "airtable";

export async function GET(req: Request, res: Response) {
    const { AIRTABLE_API_TOKEN, AIRTABLE_BASE_ID } = process.env;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!AIRTABLE_API_TOKEN || !AIRTABLE_BASE_ID) {
        return Response.error();
    }

    const base = new Airtable({ apiKey: AIRTABLE_API_TOKEN }).base(
        AIRTABLE_BASE_ID
    );

    try {
        const records = await base("Contacts").select({}).all();
        const data = records.map((record) => record.fields);

        return Response.json(data);
    } catch (error) {
        console.error(error);
    }
}

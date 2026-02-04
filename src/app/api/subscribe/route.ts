import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const n8nRes = await fetch(
            "https://n8n.yespstudio.com/webhook/e0d16d09-91d9-4491-953e-262fa2cdea8c",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...body,
                    source: 'Newsletter Subscribe',
                    timestamp: new Date().toISOString()
                }),
            }
        );

        if (!n8nRes.ok) {
            const text = await n8nRes.text();
            console.error("n8n error:", text);
            return NextResponse.json(
                { error: "n8n failed", details: text },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("API crash:", err);
        return NextResponse.json(
            { error: "Server crash", details: err.message },
            { status: 500 }
        );
    }
}

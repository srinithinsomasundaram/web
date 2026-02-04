import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Use new webhook for Lead Popup, old one for everything else (e.g. Contact Form)
        const webhookUrl = body.source === 'Global Lead Popup'
            ? "https://n8n.yespstudio.com/webhook/274a2f0c-5176-4f15-8cf3-daa126f006f5"
            : "https://n8n.yespstudio.com/webhook/5efac579-1d3b-4376-86bf-24ad0effbf26";

        const n8nRes = await fetch(
            webhookUrl,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );

        const text = await n8nRes.text();

        if (!n8nRes.ok) {
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

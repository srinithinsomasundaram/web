import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // Log the submission
        console.log('Clinic Enquiry Received:', {
            name: data.name,
            clinicName: data.clinicName,
            phone: data.phone,
            email: data.email,
            message: data.message,
            submittedAt: data.submittedAt,
            source: data.source
        });

        // TODO: Implement your automation here
        // 1. Send confirmation email to the clinic owner
        // 2. Send notification email/WhatsApp to your team
        // 3. Save to database/CRM
        // 4. Trigger follow-up sequences

        /* 
        Example integrations you can add:

        // Send to your email via SendGrid/Resend
        await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'enquiries@yespstudio.com',
                to: 'hello@yespstudio.com',
                subject: `New Clinic Enquiry from ${data.name}`,
                html: `
                    <h2>New Clinic Enquiry</h2>
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Clinic:</strong> ${data.clinicName}</p>
                    <p><strong>Phone:</strong> ${data.phone}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Message:</strong> ${data.message}</p>
                `
            })
        });

        // Send WhatsApp notification to yourself
        await fetch(`https://api.whatsapp.com/send?phone=919751755757&text=New clinic enquiry from ${data.name} at ${data.clinicName}`, {
            method: 'POST'
        });

        // Save to Airtable/Notion/Database
        await fetch('https://api.airtable.com/v0/YOUR_BASE/Enquiries', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fields: {
                    Name: data.name,
                    Clinic: data.clinicName,
                    Phone: data.phone,
                    Email: data.email,
                    Message: data.message,
                    Source: data.source,
                    Status: 'New'
                }
            })
        });

        // Send confirmation email to the clinic owner
        await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'Yesp Studio <hello@yespstudio.com>',
                to: data.email,
                subject: 'We received your enquiry - Yesp Studio',
                html: `
                    <h2>Thank you for your enquiry, ${data.name}!</h2>
                    <p>We've received your request for clinic automation and will get back to you within 24 hours.</p>
                    <p>In the meantime, feel free to reach out on WhatsApp: <a href="https://wa.me/919751755757">+91 97517 55757</a></p>
                    <p>Best regards,<br>Yesp Studio Team</p>
                `
            })
        });
        */

        return NextResponse.json(
            {
                success: true,
                message: 'Enquiry received successfully'
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error processing clinic enquiry:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to process enquiry'
            },
            { status: 500 }
        );
    }
}

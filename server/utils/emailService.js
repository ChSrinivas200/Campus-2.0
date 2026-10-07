const nodemailer = require('nodemailer');

// Create reusable transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'srinivasalbertrose@gmail.com',
    pass: process.env.EMAIL_PASS || 'sqbqbotclhlbmzgs',
  },
});

// Verify email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.warn('⚠️ Gmail Transporter Warning (Will retry on send):', error.message);
  } else {
    console.log('✅ Gmail Transporter successfully connected & ready to send passes!');
  }
});

/**
 * Send official COLORIDO-2K27 Registration Confirmation & Digital Fest Pass
 * @param {Object} user 
 */
async function sendRegistrationConfirmation(user) {
  try {
    const {
      fullName,
      regdNo,
      email,
      phone,
      department,
      collegeName,
      yearOfStudy,
      participationType,
      teamName,
      teamMembers,
      events,
      ticketId,
      registeredAt
    } = user;

    const eventListHtml = (events && events.length > 0)
      ? events.map(ev => `
        <li style="margin-bottom: 8px; padding: 8px 12px; background: rgba(139, 92, 246, 0.08); border-left: 3px solid #8b5cf6; border-radius: 4px; font-size: 14px; color: #1e1b4b;">
          <strong>🎯 ${ev}</strong>
        </li>
      `).join('')
      : '<li style="font-size: 14px; color: #64748b;">General Fest Delegate / All-Access Pass</li>';

    const teamHtml = (participationType === 'Team' && teamName) ? `
      <div style="margin-top: 15px; padding: 12px; background: #fdf2f8; border-radius: 8px; border: 1px solid #fbcfe8;">
        <p style="margin: 0 0 5px 0; font-size: 13px; font-weight: bold; color: #be185d;">👥 Team Name: ${teamName}</p>
        ${teamMembers && teamMembers.length > 0 ? `
          <p style="margin: 0; font-size: 12px; color: #64748b;">Members: ${teamMembers.join(', ')}</p>
        ` : ''}
      </div>
    ` : '';

    const formattedDate = registeredAt 
      ? new Date(registeredAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      : new Date().toLocaleDateString('en-IN');

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>COLORIDO-2K27 Official Fest Pass</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0b0f19; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          
          <!-- Gradient Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%); padding: 35px 30px; text-align: center; color: #ffffff;">
              <span style="display: inline-block; padding: 4px 14px; background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); border-radius: 20px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: bold; margin-bottom: 12px;">
                R.V.R. & J.C. College of Engineering
              </span>
              <h1 style="margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; text-transform: uppercase;">
                COLORIDO 2K27
              </h1>
              <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9; letter-spacing: 0.5px;">
                Annual Cultural & Sports Extravaganza
              </p>
            </td>
          </tr>

          <!-- Confirmation Badge -->
          <tr>
            <td style="padding: 24px 30px 10px 30px; text-align: center;">
              <div style="display: inline-block; padding: 8px 18px; background: #ecfdf5; border: 1px solid #10b981; border-radius: 30px; color: #047857; font-size: 13px; font-weight: 700;">
                ✓ Registration Confirmed & Verified Pass Issued
              </div>
              <h2 style="margin: 16px 0 6px 0; color: #0f172a; font-size: 22px; font-weight: 800;">
                Welcome, ${fullName}!
              </h2>
              <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.5;">
                Thank you for registering for <strong>COLORIDO-2K27</strong>. Your official entry pass and participation details have been confirmed in the festival registry.
              </p>
            </td>
          </tr>

          <!-- Ticket Box -->
          <tr>
            <td style="padding: 15px 30px;">
              <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); border-radius: 12px; padding: 22px; color: #ffffff; text-align: center; position: relative;">
                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #a5b4fc; font-weight: 600;">
                  Official Digital Pass ID
                </span>
                <div style="font-size: 28px; font-weight: 800; letter-spacing: 3px; color: #38bdf8; margin: 8px 0; font-family: 'Courier New', monospace;">
                  ${ticketId}
                </div>
                <div style="font-size: 12px; color: #cbd5e1;">
                  Status: <span style="color: #4ade80; font-weight: bold;">● Active & Gate Verifiable</span>
                </div>
              </div>
            </td>
          </tr>

          <!-- Delegate Details -->
          <tr>
            <td style="padding: 10px 30px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
                <tr style="background: #f8fafc;">
                  <td style="padding: 10px 14px; font-size: 12px; color: #64748b; font-weight: 600; width: 40%; border-bottom: 1px solid #e2e8f0;">Regd Number:</td>
                  <td style="padding: 10px 14px; font-size: 13px; color: #0f172a; font-weight: 700; border-bottom: 1px solid #e2e8f0;">${regdNo}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; font-size: 12px; color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0;">Department:</td>
                  <td style="padding: 10px 14px; font-size: 13px; color: #0f172a; font-weight: 700; border-bottom: 1px solid #e2e8f0;">${department} (${yearOfStudy || 'Undergraduate'})</td>
                </tr>
                <tr style="background: #f8fafc;">
                  <td style="padding: 10px 14px; font-size: 12px; color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0;">Institution:</td>
                  <td style="padding: 10px 14px; font-size: 13px; color: #0f172a; font-weight: 700; border-bottom: 1px solid #e2e8f0;">${collegeName || 'R.V.R. & J.C. College of Engineering'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; font-size: 12px; color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0;">Mobile Contact:</td>
                  <td style="padding: 10px 14px; font-size: 13px; color: #0f172a; font-weight: 700; border-bottom: 1px solid #e2e8f0;">${phone}</td>
                </tr>
                <tr style="background: #f8fafc;">
                  <td style="padding: 10px 14px; font-size: 12px; color: #64748b; font-weight: 600;">Format:</td>
                  <td style="padding: 10px 14px; font-size: 13px; color: #0f172a; font-weight: 700;">${participationType} Entry</td>
                </tr>
              </table>
              ${teamHtml}
            </td>
          </tr>

          <!-- Registered Events -->
          <tr>
            <td style="padding: 15px 30px;">
              <h3 style="margin: 0 0 10px 0; font-size: 15px; color: #0f172a; font-weight: 700;">
                🎪 Registered Competitions & Events
              </h3>
              <ul style="list-style: none; padding: 0; margin: 0;">
                ${eventListHtml}
              </ul>
            </td>
          </tr>

          <!-- Important Guidelines -->
          <tr>
            <td style="padding: 10px 30px 20px 30px;">
              <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 14px; font-size: 12px; color: #92400e; line-height: 1.5;">
                <strong>📌 Important Delegate Instructions:</strong><br>
                1. Please bring your <strong>College ID Card</strong> and show this Digital Pass on your mobile device at the registration helpdesk.<br>
                2. Reporting Time: <strong>08:30 AM</strong> on <strong>February 26, 2027</strong> at Silver Jubilee Auditorium / Event Venues.<br>
                3. Total Cash Prize Pool: <strong>₹1,50,000+</strong> across Cultural & Sports tracks with merit certificates for all finalists.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #0f172a; color: #94a3b8; padding: 25px 30px; text-align: center; font-size: 12px; line-height: 1.6;">
              <p style="margin: 0 0 6px 0; color: #ffffff; font-weight: 700; font-size: 13px;">
                COLORIDO 2K27 Steering Committee
              </p>
              <p style="margin: 0 0 12px 0;">
                Extra-Curricular Activities Committee & Digital Club<br>
                R.V.R. & J.C. College of Engineering, Chowdavaram, Guntur - 522019
              </p>
              <div style="border-top: 1px solid #1e293b; padding-top: 12px; font-size: 11px; color: #64748b;">
                Registered on: ${formattedDate} | Pass ID: ${ticketId}<br>
                Queries? Contact: srinivasalbertrose@gmail.com
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const mailOptions = {
      from: `"COLORIDO-2K27 Official Fest" <${process.env.EMAIL_USER || 'srinivasalbertrose@gmail.com'}>`,
      to: cleanEmail(email),
      subject: `🎉 Registration Confirmed! Your Official COLORIDO-2K27 Fest Pass [${ticketId}]`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✉️ Email successfully dispatched to ${email}! MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error('❌ Failed to dispatch confirmation email:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Send official Attendance & Participation Confirmation to students who appeared at the fest
 */
async function sendAppearedConfirmation(user, customMessage = '') {
  try {
    const {
      fullName,
      regdNo,
      email,
      department,
      collegeName,
      ticketId,
      events
    } = user;

    if (!email) {
      return { success: false, error: 'No recipient email specified' };
    }

    const eventListHtml = (events && events.length > 0)
      ? events.map(ev => `<li style="padding: 6px 10px; margin-bottom: 6px; background: #f0fdf4; border-left: 3px solid #10b981; font-size: 13px; color: #065f46;"><strong>★ ${ev}</strong></li>`).join('')
      : '<li style="font-size: 13px; color: #64748b;">General Fest Delegate / All-Access Attendee</li>';

    const verifiedTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });

    const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background-color: #0d1117; font-family: 'Segoe UI', Tahoma, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0d1117; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
          
          <tr>
            <td style="background: linear-gradient(135deg, #059669 0%, #10b981 50%, #047857 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
              <span style="display: inline-block; padding: 4px 12px; background: rgba(255,255,255,0.25); border-radius: 20px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: bold; margin-bottom: 8px;">
                R.V.R. & J.C. College of Engineering
              </span>
              <h1 style="margin: 0; font-size: 28px; font-weight: 800; text-transform: uppercase;">
                COLORIDO 2K27
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.95;">
                Official Fest Attendance & Delegate Verification Record
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 24px 28px 10px 28px; text-align: center;">
              <div style="display: inline-block; padding: 8px 20px; background: #ecfdf5; border: 2px solid #059669; border-radius: 30px; color: #047857; font-size: 14px; font-weight: 800;">
                ✓ Gate Verification Confirmed • Official Fest Attendee
              </div>
              <h2 style="margin: 16px 0 4px 0; color: #0f172a; font-size: 22px;">
                Hello ${fullName}!
              </h2>
              <p style="margin: 0; color: #475569; font-size: 14px;">
                Your presence at COLORIDO 2K27 has been officially verified at the campus gate checkpoint.
              </p>
            </td>
          </tr>

          ${customMessage ? `
          <tr>
            <td style="padding: 10px 28px;">
              <div style="padding: 14px; background: #fffbeb; border: 1px solid #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px; font-size: 13px; color: #92400e;">
                <strong>📢 Note from Fest Steering Committee:</strong><br>
                ${customMessage}
              </div>
            </td>
          </tr>
          ` : ''}

          <tr>
            <td style="padding: 15px 28px;">
              <table width="100%" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; font-size: 13px;">
                <tr><td style="color: #64748b; padding: 4px 0;">Registration No:</td><td style="font-weight: bold; color: #0f172a;">${regdNo || 'N/A'}</td></tr>
                <tr><td style="color: #64748b; padding: 4px 0;">Department:</td><td style="font-weight: bold; color: #0f172a;">${department || 'General'}</td></tr>
                <tr><td style="color: #64748b; padding: 4px 0;">College:</td><td style="font-weight: bold; color: #0f172a;">${collegeName || 'R.V.R. & J.C. CE'}</td></tr>
                <tr><td style="color: #64748b; padding: 4px 0;">Digital Pass ID:</td><td style="font-family: monospace; font-weight: bold; color: #059669;">${ticketId}</td></tr>
                <tr><td style="color: #64748b; padding: 4px 0;">Gate Verified At:</td><td style="font-weight: bold; color: #0f172a;">${verifiedTime}</td></tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 5px 28px 20px 28px;">
              <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: bold; color: #1e293b;">
                Registered Competition Tracks:
              </p>
              <ul style="margin: 0; padding-left: 0; list-style: none;">
                ${eventListHtml}
              </ul>
            </td>
          </tr>

          <tr>
            <td style="background: #0f172a; color: #94a3b8; padding: 22px 24px; text-align: center; font-size: 11px;">
              <p style="margin: 0 0 4px 0; color: #ffffff; font-weight: bold;">COLORIDO 2K27 Steering Committee</p>
              <p style="margin: 0;">R.V.R. & J.C. College of Engineering, Guntur - 522019</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const mailOptions = {
      from: `"COLORIDO-2K27 Attendance Desk" <${process.env.EMAIL_USER || 'srinivasalbertrose@gmail.com'}>`,
      to: cleanEmail(email),
      subject: `✅ Attendance Verified: Welcome to COLORIDO-2K27, ${fullName}! [Pass: ${ticketId}]`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✉️ Attendance confirmation sent to ${email} (MessageId: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Attendance email error:', error.message);
    return { success: false, error: error.message };
  }
}

function cleanEmail(email) {
  return email ? email.trim() : '';
}

module.exports = {
  transporter,
  sendRegistrationConfirmation,
  sendAppearedConfirmation
};


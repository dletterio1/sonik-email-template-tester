import fs from 'fs/promises';

async function createApiTemplate() {
  console.log("🛠 Creating API-ready template with custom fonts...\n");
  
  // Read the original template with Handlebars variables
  const originalTemplate = await fs.readFile('templates/organization_invitation.html', 'utf-8');
  
  // Custom font CSS that will replace the existing style block
  const customFontCSS = `
    <style type="text/css">
      /* Custom Font Strategy: Phudu → General Sans → System Fonts */
      
      /* Ensure fonts load correctly */
      @font-face {
        font-family: "Phudu";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/phudu/v1/0FlMVPXVHdLlqPN9.woff2) format("woff2");
      }
      
      /* Email client reset styles */
      body, table, td, a {
        text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      
      /* Base font settings */
      body {
        margin: 0;
        padding: 0;
        font-family: 'Phudu', 'General Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 400;
        background-color: white;
      }
      
      /* Header styles - Semi-Bold fallback */
      .header-text, .welcome-text, .download-title {
        font-family: 'Phudu', 'General Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 600;
      }
      
      /* Button styles - Semi-Bold fallback */
      .button-text, .cta-button {
        font-family: 'Phudu', 'General Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 600;
      }
      
      /* Body text styles - Regular fallback */
      .body-text, .description-text, .footer-text {
        font-family: 'Phudu', 'General Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 400;
      }
      
      /* Feature titles - Semi-Bold fallback */
      .feature-title {
        font-family: 'Phudu', 'General Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-weight: 600;
      }
      
      /* Responsive styles */
      @media screen and (max-width: 600px) {
        .responsive-table {
          width: 100% !important;
        }
      }
    </style>`;

  // Replace the existing style block with our custom CSS
  let modifiedTemplate = originalTemplate.replace(
    /<style type="text\/css">[\s\S]*?<\/style>/,
    customFontCSS
  );

  // Add CSS classes to appropriate elements while preserving Handlebars variables
  modifiedTemplate = modifiedTemplate
    // Large headers (WELCOME TO) - preserve {{welcomeText}} and {{toText}}
    .replace(
      /style="[^"]*font-family:[^"]*font-size:\s*70px[^"]*"/g,
      'class="welcome-text" style="font-size: 70px; font-weight: 600; margin: 0; line-height: 1; color: white; text-transform: uppercase;"'
    )
    // Download section title - preserve {{DOWNLOADSECTION.TITLE}}
    .replace(
      /style="[^"]*font-family:[^"]*font-size:\s*36px[^"]*"/g,
      'class="download-title" style="font-size: 36px; font-weight: 600; padding-bottom: 24px; color: white; text-transform: uppercase;"'
    )
    // Buttons - preserve {{buttons.createAccount}} 
    .replace(
      /style="[^"]*background-color:\s*#7c5df8[^"]*"/g,
      'class="cta-button" style="background-color: #7c5df8; color: white; padding: 10px 24px; font-weight: 600; font-size: 22px; border-radius: 8px; text-decoration: none; display: inline-block;"'
    )
    // Feature titles - preserve {{features.create.title}} etc.
    .replace(
      /style="[^"]*font-weight:\s*600[^"]*letter-spacing:\s*1px[^"]*color:\s*white[^"]*text-transform:\s*uppercase[^"]*"/g,
      'class="feature-title" style="font-weight: 600; padding-top: 10px; padding-bottom: 12px; letter-spacing: 1px; color: white; text-transform: uppercase;"'
    )
    // Description text - preserve {{description.inviteText}} etc.
    .replace(
      /style="[^"]*font-size:\s*20px[^"]*color:\s*white[^"]*font-weight:\s*400[^"]*"/g,
      'class="description-text" style="font-size: 20px; color: white; font-weight: 400; letter-spacing: 0.05em; padding-bottom: 24px;"'
    );

  // Write the API-ready template
  await fs.writeFile('api-implementation/template/organization_invitation.html', modifiedTemplate);
  
  console.log("✅ Created: api-implementation/template/organization_invitation.html");
  console.log("   • Contains all Handlebars variables for API integration");
  console.log("   • Includes custom font CSS with proper fallbacks");
  console.log("   • Ready to copy to sonik-node-api/public/templates/");
  console.log("   • Supports Phudu → General Sans → System font fallbacks\n");
}

createApiTemplate().catch(console.error); 
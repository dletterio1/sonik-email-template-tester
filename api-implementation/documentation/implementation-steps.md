# 🚀 Implementation Steps

## Step 1: Backup Current Template

```bash
# Navigate to your sonik-node-api directory
cd sonik-node-api/

# Backup the current template
cp public/templates/organization_invitation.html public/templates/organization_invitation_backup.html
```

## Step 2: Replace Template

```bash
# Copy the new template from the implementation package
cp ../email-template-tester/api-implementation/template/organization_invitation.html public/templates/
```

## Step 3: Update Invitation Controller

**File:** `src/controllers/invitation.controller.js`

### **Current Code (around lines 70-85):**
```javascript
await NotificationService.sendNotification(
  userExists?._id,
  {
    email: email,
    template: NotificationConst.templates.ORGANIZATION_INVITATION,
    emailTemplate: NotificationConst.emailTemplates.ORGANIZATION_INVITATION,
    type: NotificationConst.types.INVITATION,
    params: {
      organizationName: orgExists?.name,
      createAccountLink: `${config.frontend_url}/invitation/${result?.token}?type=organization-invitation`,
    }
  }
);
```

### **Replace With:**
```javascript
await NotificationService.sendNotification(
  userExists?._id,
  {
    email: email,
    template: NotificationConst.templates.ORGANIZATION_INVITATION,
    emailTemplate: NotificationConst.emailTemplates.ORGANIZATION_INVITATION,
    type: NotificationConst.types.INVITATION,
    params: {
      // Basic template variables
      pageTitle: "Organization Invitation - Sonik",
      lang: userExists?.locale || "en",
      welcomeText: "WELCOME",
      toText: "TO",
      
      // Description section
      description: {
        inviteText: "You have been invited to join",
        companyName: orgExists?.name || "this organization",
        createAccount: "Click below to create your account and get started.",
        ignoreMessage: "If you did not request this invitation, please ignore this email."
      },
      
      // Links and URLs
      createAccountLink: `${config.frontend_url}/invitation/${result?.token}?type=organization-invitation`,
      logoAlt: "Sonik Logo",
      welcomeImageAlt: "Sonik Logo",
      
      // Buttons section
      buttons: {
        createAccount: "CREATE ACCOUNT"
      },
      
      // Download section
      DOWNLOADSECTION: {
        TITLE: "DOWNLOAD THE APP",
        subtitle: "Get the full Sonik experience on your mobile device"
      },
      
      // App store links (update with actual URLs)
      appStoreUrl: "https://apps.apple.com/app/sonik",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.sonik",
      
      // Feature sections
      features: {
        create: {
          title: "CREATE",
          description: "Build your musical identity with custom playlists and share your unique sound."
        },
        upload: {
          title: "UPLOAD", 
          description: "Share your original tracks and discover new music from emerging artists."
        },
        share: {
          title: "SHARE",
          description: "Connect with friends and artists, and build your music community."
        }
      },
      
      // Footer links
      footer: {
        unsubscribeUrl: `${config.frontend_url}/unsubscribe?token=${result?.token}`,
        privacyUrl: `${config.frontend_url}/privacy`,
        termsUrl: `${config.frontend_url}/terms`,
        supportUrl: `${config.frontend_url}/support`,
        websiteUrl: config.frontend_url
      }
    }
  }
);
```

## Step 4: Update App Store URLs (Optional)

If you have actual app store URLs, replace these placeholders:
- `appStoreUrl: "https://apps.apple.com/app/sonik"`
- `playStoreUrl: "https://play.google.com/store/apps/details?id=com.sonik"`

## Step 5: Test the Implementation

### **Send Test Email:**
```bash
# Use your existing invitation endpoint to send a test email
curl -X POST http://localhost:3000/api/invitations/organization \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "organizationId": "your-org-id"
  }'
```

### **Check Email Client Rendering:**
1. **Gmail:** Should display Phudu fonts (branded look)
2. **Outlook:** Should display General Sans fonts (professional look)  
3. **Apple Mail:** Should display Phudu fonts (branded look)
4. **Mobile:** Should display system fonts (optimized readability)

## Step 6: Verify Template Compilation

Check that your email shows:
- ✅ "WELCOME TO [SONIK LOGO]" instead of `{{welcomeText}} {{toText}}`
- ✅ Organization name instead of `{{description.companyName}}`
- ✅ "CREATE ACCOUNT" button instead of `{{buttons.createAccount}}`
- ✅ "DOWNLOAD THE APP" instead of `{{DOWNLOADSECTION.TITLE}}`
- ✅ Feature descriptions instead of `{{features.create.description}}`

## Step 7: Monitor Performance

After deployment:
- Monitor email delivery rates
- Check for any font loading issues
- Gather feedback on email appearance across different clients
- Test on mobile devices

## 🚨 Rollback Plan

If issues occur:
```bash
# Restore the original template
cp public/templates/organization_invitation_backup.html public/templates/organization_invitation.html

# Revert controller changes to original params structure
```

## ✅ Success Criteria

- [ ] Template replaces successfully without errors
- [ ] All Handlebars variables compile correctly
- [ ] Fonts display properly across email clients
- [ ] No unprocessed `{{variables}}` in sent emails
- [ ] Links and buttons work correctly
- [ ] Email passes through spam filters
- [ ] Mobile rendering looks good

---

*This implementation ensures your organization invitation emails maintain brand consistency while providing professional fallbacks for all email clients.* 
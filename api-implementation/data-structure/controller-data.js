// 📧 Data structure for invitation.controller.js
// Copy this structure to your controller when sending organization invitation emails

const organizationInvitationData = {
  // Basic template variables
  pageTitle: "Organization Invitation - Sonik",
  lang: userExists?.locale || "en", // Use user's preferred language or default to English
  welcomeText: "WELCOME",
  toText: "TO",
  
  // Description section
  description: {
    inviteText: "You have been invited to join",
    companyName: orgExists?.name || "this organization", // Use actual organization name
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
  
  // Download section (FIXED - was DOWNLOADSECTION, should be downloadSection)
  downloadSection: {
    title: "DOWNLOAD THE APP",
    subtitle: "Get the full Sonik experience on your mobile device",
    appStore: "APP STORE", // Text for App Store button
    playStore: "GOOGLE PLAY", // Text for Google Play button
    appStoreAlt: "Download on App Store", // Alt text for App Store icon
    playStoreAlt: "Get it on Google Play" // Alt text for Google Play icon
  },
  
  // App store links
  appStoreUrl: "https://apps.apple.com/app/sonik", // Update with actual App Store URL
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.sonik", // Update with actual Play Store URL
  
  // Feature sections (FIXED - template expects different structure)
  features: {
    discovery: {
      title: "CREATE",
      description: "Build your musical identity with custom playlists and share your unique sound.",
      iconAlt: "Create Icon"
    },
    secure: {
      title: "UPLOAD", 
      description: "Share your original tracks and discover new music from emerging artists.",
      iconAlt: "Upload Icon"
    },
    transparent: {
      title: "SHARE",
      description: "Connect with friends and artists, and build your music community.",
      iconAlt: "Share Icon"
    }
  },
  
  // Footer links (FIXED - template expects more detailed footer structure)
  footer: {
    emailSentTo: "This email was sent to",
    unsubscribeText: ". If you no longer want to receive these emails, you can",
    unsubscribe: "unsubscribe",
    managePreferences: "manage your preferences"
  },
  
  // User email for footer
  userEmail: email, // The recipient's email address
  
  // Footer URLs
  unsubscribeUrl: `${config.frontend_url}/unsubscribe?token=${result?.token}`,
  preferencesUrl: `${config.frontend_url}/preferences?token=${result?.token}`,
  privacyUrl: `${config.frontend_url}/privacy`,
  termsUrl: `${config.frontend_url}/terms`,
  supportUrl: `${config.frontend_url}/support`,
  websiteUrl: config.frontend_url
};

// 🚀 USAGE IN CONTROLLER:
// Replace the existing NotificationService.sendNotification call with:

/*
await NotificationService.sendNotification(
  userExists?._id,
  {
    email: email,
    template: NotificationConst.templates.ORGANIZATION_INVITATION,
    emailTemplate: NotificationConst.emailTemplates.ORGANIZATION_INVITATION,
    type: NotificationConst.types.INVITATION,
    params: organizationInvitationData
  }
);
*/

export default organizationInvitationData; 
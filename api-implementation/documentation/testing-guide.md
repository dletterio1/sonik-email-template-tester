# 🧪 Testing Guide

## Pre-Implementation Testing

### **1. Validate Template Compilation**
```bash
# Navigate to email-template-tester directory
cd email-template-tester/

# Test template compilation with sample data
npm test

# Verify no double brackets in output
grep -r "{{" output/
# Should return no results for compiled templates
```

### **2. Font Loading Test**
```bash
# Open browser test versions
open output/custom-fonts/organization_invitation_custom-font-strategy.html
open output/custom-fonts/organization_invitation_outlook-simulation.html
```

**Check:**
- ✅ Headers display consistently
- ✅ Font fallbacks work when Google Fonts disabled
- ✅ Mobile responsiveness maintained

## Post-Implementation Testing

### **1. Send Test Email**

**Method 1: Using API Endpoint**
```bash
curl -X POST http://localhost:3000/api/invitations/organization \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "email": "your-test-email@gmail.com",
    "organizationId": "test-org-id"
  }'
```

**Method 2: Using Node.js Script**
```javascript
// test-email.js
const NotificationService = require('./src/services/notification.service');
const NotificationConst = require('./src/consts/notification.const');

async function testEmail() {
  await NotificationService.sendNotification(null, {
    email: "your-test-email@gmail.com",
    template: NotificationConst.templates.ORGANIZATION_INVITATION,
    emailTemplate: NotificationConst.emailTemplates.ORGANIZATION_INVITATION,
    type: NotificationConst.types.INVITATION,
    params: {
      // Use the full data structure from controller-data.js
      pageTitle: "Organization Invitation - Sonik",
      lang: "en",
      welcomeText: "WELCOME",
      // ... rest of the data structure
    }
  });
}

testEmail().catch(console.error);
```

### **2. Email Client Testing**

#### **Gmail (Web & Mobile)**
- [ ] Phudu fonts display correctly
- [ ] Headers are bold (Semi-Bold weight)
- [ ] Body text is regular weight
- [ ] Links work properly
- [ ] Images load correctly
- [ ] Mobile responsive design

#### **Outlook (Desktop & Web)**
- [ ] General Sans fonts display (or system fallback)
- [ ] Professional appearance maintained
- [ ] No layout breaking
- [ ] CTA buttons functional
- [ ] Images display properly

#### **Apple Mail (macOS & iOS)**
- [ ] Phudu fonts display correctly
- [ ] Consistent with Gmail appearance
- [ ] Mobile version renders well
- [ ] Dark mode compatibility (if applicable)

#### **Mobile Devices**
- [ ] Text remains readable
- [ ] Buttons are touch-friendly
- [ ] Images scale appropriately
- [ ] No horizontal scrolling required

### **3. Template Variable Verification**

**Check for Unprocessed Variables:**
```bash
# Search for any remaining double brackets in sent emails
# View source of received email and search for:
{{
```

**Verify All Data Displays:**
- [ ] Page title shows "Organization Invitation - Sonik"
- [ ] Welcome text shows "WELCOME TO [SONIK LOGO]"
- [ ] Organization name displays correctly
- [ ] Create account link works
- [ ] Download section appears
- [ ] Feature descriptions are complete
- [ ] Footer links are functional

### **4. Performance Testing**

#### **Font Loading Speed**
- [ ] Fonts load within 3 seconds
- [ ] No layout shift during font loading
- [ ] Fallback fonts display immediately

#### **Email Delivery**
- [ ] Emails arrive within expected timeframe
- [ ] Not marked as spam
- [ ] Images load from CDN correctly

#### **Network Fallback**
- [ ] Email readable without internet (using cached/system fonts)
- [ ] No broken elements when external resources fail

## Automated Testing

### **1. Template Validation Script**
```javascript
// validate-template.js
const fs = require('fs');
const Handlebars = require('handlebars');

function validateTemplate() {
  const template = fs.readFileSync('public/templates/organization_invitation.html', 'utf-8');
  const sampleData = require('./api-implementation/data-structure/sample-data.json');
  
  try {
    const compiled = Handlebars.compile(template);
    const result = compiled(sampleData);
    
    // Check for unprocessed variables
    const hasVariables = result.includes('{{') && result.includes('}}');
    
    if (hasVariables) {
      console.error('❌ Template has unprocessed variables');
      return false;
    }
    
    console.log('✅ Template compiles successfully');
    return true;
  } catch (error) {
    console.error('❌ Template compilation error:', error);
    return false;
  }
}

validateTemplate();
```

### **2. Font Detection Script**
```javascript
// check-fonts.js
const puppeteer = require('puppeteer');

async function checkFonts() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Load the compiled template
  await page.goto('file://' + __dirname + '/output/custom-fonts/organization_invitation_custom-font-strategy.html');
  
  // Check computed font families
  const headerFont = await page.evaluate(() => {
    const element = document.querySelector('.welcome-text');
    return window.getComputedStyle(element).fontFamily;
  });
  
  console.log('Header font:', headerFont);
  
  // Should contain 'Phudu' or fallback fonts
  const hasPhudu = headerFont.includes('Phudu');
  const hasFallback = headerFont.includes('General Sans') || headerFont.includes('system-ui');
  
  console.log(hasPhudu ? '✅ Phudu font detected' : '⚠️  Phudu font not loaded');
  console.log(hasFallback ? '✅ Fallback fonts configured' : '❌ No fallback fonts');
  
  await browser.close();
}

checkFonts().catch(console.error);
```

## Regression Testing

### **After Each Change:**
1. [ ] Template still compiles without errors
2. [ ] All email clients render correctly
3. [ ] Performance hasn't degraded
4. [ ] Mobile compatibility maintained
5. [ ] Accessibility standards met

### **Rollback Testing:**
1. [ ] Backup template restores successfully
2. [ ] Original functionality preserved
3. [ ] No data loss during rollback

## Email Client Matrix

| Client | Version | Status | Notes |
|--------|---------|--------|-------|
| Gmail Web | Latest | ✅ | Full Phudu support |
| Gmail Mobile | Latest | ✅ | Responsive design |
| Outlook 2016+ | 2016-2021 | ✅ | General Sans fallback |
| Outlook.com | Web | ✅ | System font fallback |
| Apple Mail | macOS/iOS | ✅ | Full Phudu support |
| Yahoo Mail | Web | ⚠️ | Limited font support |
| Thunderbird | Latest | ✅ | System font fallback |
| Samsung Email | Android | ✅ | System font fallback |

## Success Metrics

### **Visual Quality**
- [ ] Brand consistency in modern clients
- [ ] Professional appearance in corporate clients
- [ ] Readable text in all clients

### **Technical Performance**
- [ ] 100% template compilation success
- [ ] <3 second font loading time
- [ ] 0 unprocessed variables in production

### **User Experience**
- [ ] Consistent cross-client experience
- [ ] Mobile-friendly design
- [ ] Accessible color contrast

---

*This testing guide ensures your email template implementation meets quality standards across all email clients and use cases.* 
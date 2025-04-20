# Setting Up Fillout.com Forms for NBA Tech Website

This guide will help you set up different Fillout.com forms for various purposes on your NBA Tech website.

## Form IDs Used in the Website

The website uses the following Fillout.com form IDs:

1. **Contact Form** (ID: `cAWaWMHJmpus`)
   - Used in the main contact section and for security audit requests
   - Embedded directly on the page for contact form
   - Opens in a modal popup for the security audit button
   - For general inquiries and security audit requests

2. **Newsletter Form** (ID: `3tKPUffptcus`)
   - Used specifically for newsletter subscriptions in the footer
   - Opens in a modal popup when the Subscribe button is clicked
   - Designed for quick newsletter sign-ups

3. **Consultation Form** (ID: `7GUTeCtnRvus`)
   - Used for consultation requests in the CTA section
   - Opens in a modal popup when the button is clicked
   - For scheduling free consultations

## Creating Custom Forms in Fillout.com

To create custom forms for each purpose:

1. **Log in to your Fillout.com account**

2. **Create a new form for each purpose**:
   - Click "Create Form" or equivalent button
   - Choose a template or start from scratch
   - Name your form appropriately (e.g., "NBA Tech - Contact Form")

3. **Customize each form with appropriate fields**:

   ### Contact Form
   - Name (required)
   - Email (required)
   - Company
   - Phone
   - Service Interested In (dropdown)
   - Message (text area)

   ### Security Audit Request Form
   - Name (required)
   - Email (required)
   - Company
   - Phone
   - Current Security Concerns (text area)
   - Preferred Contact Method
   - Best Time to Contact

   ### Newsletter Subscription Form
   - Email (required)
   - Name (optional)
   - Topics of Interest (checkboxes)
   - How did you hear about us?

   ### Consultation Request Form
   - Name (required)
   - Email (required)
   - Company
   - Phone
   - Project Description (text area)
   - Budget Range (dropdown)
   - Timeline (dropdown)
   - Preferred Contact Method

4. **Configure form settings**:
   - Set up email notifications to nbatech467@gmail.com
   - Customize success messages
   - Set up auto-responders if desired
   - Configure branding to match your website

5. **Get the form IDs**:
   - After creating each form, note its ID from the URL or share settings
   - The ID is typically in the format like `cAWaWMHJmpus`

## Updating the Website Code

If you want to use different forms, update the form IDs in the code:

1. In `components/contact-section.tsx`:
   ```javascript
   const contactFormId = "your-contact-form-id"
   const securityAuditFormId = "your-security-audit-form-id"
   ```

2. In `components/footer.tsx`:
   ```javascript
   const newsletterFormId = "your-newsletter-form-id"
   ```

3. In `components/cta-section.tsx`:
   ```javascript
   const consultationFormId = "your-consultation-form-id"
   ```

## How the Forms Are Implemented

The forms are implemented using the Fillout.com embed code. When a user clicks on a button (like "Schedule a Free Consultation"), a modal popup appears with the embedded form. This approach provides several benefits:

1. **Better User Experience**: Users stay on your website instead of being redirected
2. **Consistent Branding**: The form appears within your website's context
3. **Higher Conversion Rates**: Fewer clicks and page loads mean more completed forms
4. **Mobile-Friendly**: The modal works well on all device sizes

## Testing Your Forms

After updating the form IDs:

1. Run your website locally: `npm run dev`
2. Test each form to ensure they open correctly
3. Submit test entries to verify that notifications are being sent
4. Check the Fillout.com dashboard to confirm submissions are being recorded

## Benefits of Using Different Forms

Using separate forms for different purposes provides several advantages:

1. **Tailored Questions**: Each form can ask questions specific to its purpose
2. **Better Data Organization**: Submissions are categorized automatically
3. **Improved User Experience**: Forms are shorter and more relevant
4. **Better Analytics**: You can track conversion rates for different types of inquiries
5. **Customized Follow-up**: Set up different auto-responders for each form type

## Maintenance

Regularly check your Fillout.com dashboard to:

1. Monitor form submissions
2. Update form fields or settings as needed
3. Export submission data for backup or analysis
4. Check analytics to see form performance

## Need Help?

If you need assistance with Fillout.com:

- Visit their [Help Center](https://help.fillout.com/)
- Contact their support team
- Refer to their API documentation for advanced integrations

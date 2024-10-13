## **Steps to Set Up Google Apps Script Integration with Google Sheets**

### **Step 1: Create a New Google Sheet**
1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
2. Name the sheet (e.g., **Contact Form Responses**).
3. Add headers to the first row to organize submissions:
   
   ```
   
   Name | Email | Message | Timestamp
   
   ```

---

### **Step 2: Add the Google Apps Script**
1. **Open the Script Editor:**
   - Click on **Extensions > Apps Script** in the menu bar.
2. **Delete any placeholder code** inside the script editor.

3. **Paste Your Script**:
   Use the following code:

   ```javascript
   function doPost(data) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var timestamp = new Date();
     
     var name = data.parameter.name;
     var email = data.parameter.email;
     var message = data.parameter.message;
     
     sheet.appendRow([name, email, message, timestamp]);

     var subject = "New Contact Form Submission from " + name;
     var body = "You have received a new message from your website contact form.\n\n" +
                "Name: " + name + "\n" +
                "Email: " + email + "\n" +
                "Message: " + message + "\n\n" +
                "Submitted on: " + timestamp;
     MailApp.sendEmail({
       to: "youremail@gmail.com",
       cc: "yourccemail@gmail.com", // CC recipient
       subject: subject,
       body: body
     });
     
     return ContentService.createTextOutput('Form submission successful!');
   }

   // Optional test function
   // function testDoPost() {
   //   var data = {
   //     parameter: {
   //       name: "Hari",
   //       email: "hari@example.com",
   //       message: "This is a test message."
   //     }
   //   };
   //   Logger.log(doPost(data));
   // }
   ```

---

### **Step 3: Deploy the Script as a Web App**
1. **Click on "Deploy" > "New Deployment".**  
2. In the deployment window:
   - **Select "Web app"** as the deployment type.
   - **Description:** Add a description (e.g., "Contact Form Integration").
   - **Execute as:** Select **Me** (your Google account).
   - **Who has access:** Select **Anyone** or **Anyone with the link** to allow your web form to send data to the script.

3. **Click "Deploy".**

4. **Authorize the Script:**
   - A pop-up will appear asking for permissions. Click **Review Permissions**.
   - Select your Google account.
   - Click **Advanced > Go to (your project)** and grant permissions.

5. **Copy the Web App URL:**  
   - After successful deployment, you’ll get a **web app URL**. Copy it for use in your contact form.

---


### **Step 4: Connect Your Form to the Script with JavaScript**  

Replace the placeholder App Script URL with your **deployed Apps Script web app URL** in `Script.js` as shown below:

```javascript
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = new FormData(this);  // Collects form data

    fetch('https://script.google.com/macros/s/your-app-script-deployment-id/exec', {  
      // Replace the above URL with your own deployed Apps Script web app URL
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      var confirmationMessage = document.getElementById('confirmationMessage');
      confirmationMessage.style.display = 'block';

      setTimeout(function() {
        confirmationMessage.style.display = 'none';  // Hide after 10 seconds
      }, 10000);

      document.getElementById('contactForm').reset();  // Reset the form
    })
    .catch(error => console.error('Error!', error.message));
  });
});
```

### **What This Code Does:**
- It listens for the submission of the contact form.
- It prevents the default form submission behavior.
- It collects the form data and sends it to your Apps Script URL using a `POST` request.
- It displays a confirmation message after submission and resets the form.

Make sure to replace the placeholder URL with your actual Apps Script deployment URL to ensure it works correctly.

---

### **Step 5: Test the Integration**
1. Go to your website and submit the contact form with sample data.
2. **Check Google Sheets:**  
   - Confirm that the new row appears with the submitted data.
3. **Check Your Email:**  
   - Verify that you received a notification with the submitted details.

---

### **Step 6: Optional Testing Using `testDoPost`**
1. In the script editor, uncomment the `testDoPost` function.
2. Click **Run > testDoPost** to simulate a form submission.
3. Check the logs with **View > Logs** to confirm the behavior.

---

### **Step 7: Monitor and Maintain**
- **Make updates** to the Apps Script as needed (e.g., modify email content or handle edge cases).
- **Monitor your deployment** and make sure that the Google Sheet is recording entries correctly.


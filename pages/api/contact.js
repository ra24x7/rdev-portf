// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { mailOptions, transporter } from "../../config/nodemailer";

const handler =  async (req, res) =>  {
  if (req.method === "POST"){
    const data = req.body;
    if (!data.name || !data.email || !data.subject || !data.message)  {
      return res.status(400).json({ message: 'Bad Request' });
    } 
        try {

          const emailContent = `
           Name: ${data.name}
           Email: ${data.email}
           Subject: ${data.subject}
           Message:${data.message}
           `;

          await transporter.sendMail ({
            ...mailOptions,
            subject: data.subject,
            text: "Email Content",
            html: `<h1>${data.subject}</h1>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${data.message}</p>`,
          })

          return res.status(200).json({success: true});
          
        } catch (error) {
          console.log(error);
          return res.status(400).json({message: error.message }); 
        }

  }
  return res.status(400).json({ message: 'Bad Request' });
};


export default handler;




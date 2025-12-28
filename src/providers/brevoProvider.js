const SibApiV3Sdk = require('@getbrevo/brevo')
import { env } from '~/config/environment'

// Cấu hình API Key
var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
var apiKey = apiInstance.authentications['apiKey']
apiKey.apiKey = env.BRAVO_API_KEY // 🔹 Thay bằng API Key của bạn

const sendEmail = async (recipientEmail, customSubject, customHtml) => {
  // Tạo email
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail() // SendSmtpEmail | Values to send a transactional email

  //Tài khoản gửi email
  sendSmtpEmail.sender = { email: env.ADMIN_EMAIL_ADDRESS, name: env.ADMIN_EMAIL_NAME } //🔹 Thay bằng email của bạn

  //Tài khoản nhận email, có thể gửi tới nhiều email nên dùng mảng
  sendSmtpEmail.to = [{ email: recipientEmail }] //🔹 Thay bằng email của bạn

  //Tiêu đề email
  sendSmtpEmail.subject = customSubject

  //Nội dung email
  sendSmtpEmail.htmlContent = customHtml

  //Hành động gửi mail
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function () {
  })
}

export const BrevoProvider = { sendEmail }

const nodemailer = require('nodemailer');

const emailID = process.env.emailID;
const emailPW = process.env.emailPW;

const sendEmail = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: emailID,
      pass: emailPW,
    },
  })

const Server = async (email, res, code) => {

      try {
        const mailhtml = `
        <div id="mainvox" style="font-family: Pretendard; width: 500px;">
        <img style="height: 35px;" src="https://user-images.githubusercontent.com/117415639/233096453-ba33cf75-b4f5-4862-a825-249167e325f1.png" />
        <h1 style="
            font-family: Pretendard; margin-bottom: 8px; font-size: 32px;">인증 번호</h1>
        <div>
            이메일 검증을 위한 인증 번호입니다. 아래 번호는 5분 뒤 만료됩니다.
        <h3 style="background-color: #ededed; padding: 24px; font-size: 36px; letter-spacing: 12px; border-radius: 8px;">${code}</h3>
            직접 인증을 요청한 적이 없다면 다른 사람에게 인증 번호를 공유하지 마세요. 개인 정보가 도용되었을 수 있으므로 비밀번호 변경이 권장됩니다.
        </div>
        <img style="height: 15px; padding-top: 16px;" src="https://user-images.githubusercontent.com/117415639/233096782-488f2a13-b729-4b2f-8911-1b34cecf440b.png" height=10 />
        </div>
      `;
  
        const mailOption = {
          from: process.env.emailID, //your or my Email(발송자)
          to: email, //your or my Email(수신자)
          subject: '[Chromatica] 인증 메일입니다.', // title  (발송 메일 제목)
          text: '인증 번호를 노출하지 마세요.', // plain text (발송 메일 내용)
          html: mailhtml, // HTML Content (발송 메일 HTML컨텐츠)
        };
  
          await sendEmail.sendMail(mailOption);
      } catch (err) {
          console.error(err);
          return 400;
      }
}
  

module.exports = {
    sendEmail,
    Server,
};

// 

/*

*/
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
        <div>
    <div id="mainvox">
    <img src="src/upload/logo.png" />
    <h1>인증 번호</h1>
    <div>
        계정 인증을 위한 번호입니다. 아래 번호는 5분 뒤 만료됩니다.
    </div>
    <h3>${code}</h3>
    <div>
        직접 인증을 요청한 적이 없다면 다른 사람에게 인증 번호를 공유하지 마세요. 개인정보가 도용되었을 수 있으므로 비밀번호 변경이 권장됩니다.
    </div>
    <img src="src/upload/logo_bars.png" height=10 />
</div>

<style>
    *{
        font-family: Pretendard;
    }
    svg{
        padding-top: 16px;
    }
    h1{
        margin-bottom: 8px;
    }
    h3{
        background-color: hsl(0, 0%, 90%);
        padding: 24px;
        font-size: 36px;
        letter-spacing: 8;
    }
    img{
        height: 35px;
    }
    #mainvox{
        width: 500px;
    }
</style>
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
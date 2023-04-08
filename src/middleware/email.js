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
    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTA2IiBoZWlnaHQ9IjYzIiB2aWV3Qm94PSIwIDAgNTA2IDYzIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMjIuNDI1OSA1My44NTAxQzE0LjMyOTkgNTMuODUwMSAxMC4xMiA0OC4xODM5IDEwLjEyIDM3LjM1NTFWMjUuNjQ0OUMxMC4xMiAxNC44MTYxIDE0LjMyOTkgOS4xNDk5IDIyLjMwNDUgOS4xNDk5QzI4Ljg2MjIgOS4xNDk5IDMzLjM1NTUgMTQuMTg2NSAzMy41MTc0IDIxLjgyNTRINDMuNDM1QzQzLjI3MzEgOC4xMDA2IDM1LjQ2MDUgMCAyMi40NjY0IDBDOC4yOTg0IDAgMCA5LjQ0MzcgMCAyNS42NDQ5VjM3LjM1NTFDMCA1My41NTYzIDguMjk4NCA2MyAyMi40NjY0IDYzQzM1LjIxNzYgNjMgNDMuNDM1IDU0LjgxNTUgNDMuNDM1IDQxLjkzSDMzLjUxNzRDMzMuMzk2IDQ5LjMxNzEgMjkuMTg2MSA1My44NTAxIDIyLjQyNTkgNTMuODUwMVoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik05Mi42NTg3IDYxLjc4MjhWMS4yMTcxOUg4My4wMjQ1VjI2LjUyNjNINjEuNzMyVjEuMjE3MTlINTIuMDk3OFY2MS43ODI4SDYxLjczMlYzNS4zODI0SDgzLjAyNDVWNjEuNzgyOEg5Mi42NTg3WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTEyNC40NzYgMzguNzQwMkwxMzUuMDAxIDYxLjc4MjhIMTQ2LjAxMUwxMzQuMjMyIDM2LjkzNTRDMTQwLjcwOCAzNC41MDEgMTQ0LjgzNyAyNy45NTM0IDE0NC44MzcgMjAuMDYyNkMxNDQuODM3IDguMzk0NCAxMzcuMjY4IDEuMjE3MTkgMTI0Ljk2MiAxLjIxNzE5SDEwNC4zOThWNjEuNzgyOEgxMTQuMTU0VjM4Ljc0MDJIMTI0LjQ3NlpNMTE0LjE1NCA5LjY1MzU2SDEyMy44MjhDMTMwLjgzMSA5LjY1MzU2IDEzNC44NzkgMTMuNTE1IDEzNC44NzkgMjAuMTg4NUMxMzQuODc5IDI2Ljg2MjEgMTMwLjc1IDMwLjc2NTUgMTIzLjYyNiAzMC43NjU1SDExNC4xNTRWOS42NTM1NloiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0xOTYuOTM1IDM2LjIyMTlWMjYuNzc4MUMxOTYuOTM1IDkuOTQ3MzcgMTg4LjU5NiAwIDE3NC44NzQgMEMxNjEuMTUxIDAgMTUyLjgxMiA5Ljk0NzM3IDE1Mi44MTIgMjYuNzc4MVYzNi4yMjE5QzE1Mi44MTIgNTMuMDUyNiAxNjEuMTUxIDYzIDE3NC44NzQgNjNDMTg4LjU5NiA2MyAxOTYuOTM1IDUzLjA1MjYgMTk2LjkzNSAzNi4yMjE5Wk0xNzQuODc0IDUzLjkzNEMxNjcuMTAxIDUzLjkzNCAxNjIuNzMgNDcuODA2MSAxNjIuNzMgMzYuMTM3OVYyNi44NjIxQzE2Mi43MyAxNS4xOTM5IDE2Ny4xMDEgOS4wNjU5NiAxNzQuODc0IDkuMDY1OTZDMTgyLjY0NiA5LjA2NTk2IDE4Ny4wMTggMTUuMTkzOSAxODcuMDE4IDI2Ljg2MjFWMzYuMTM3OUMxODcuMDE4IDQ3LjgwNjEgMTgyLjY0NiA1My45MzQgMTc0Ljg3NCA1My45MzRaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNMjEyLjkyNSA0MC40NjFMMjExLjg3MiAxNi4xMTczSDIxMi42MDFMMjIyLjY0IDQ3LjU1NDNIMjI5LjYwM0wyMzkuNjQyIDE2LjExNzNIMjQwLjM3TDIzOS4zMTggNDAuNDYxVjYxLjc4MjhIMjQ3LjY5N1YxLjIxNzE5SDIzNy4yNTNMMjI2LjQ0NSAzNy4xMDMzSDIyNS44MzhMMjE0Ljk0OSAxLjIxNzE5SDIwNC41NDVWNjEuNzgyOEgyMTIuOTI1VjQwLjQ2MVoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0yOTAuNTI1IDYxLjc4MjhIMzAxLjAwOUwyODIuOTk2IDEuMjE3MTlIMjcxLjc0MkwyNTMuNzI5IDYxLjc4MjhIMjYzLjUyNUwyNjcuNzc1IDQ1Ljg3NTRIMjg2LjMxNUwyOTAuNTI1IDYxLjc4MjhaTTI3Ni44ODMgMTEuODM2MUgyNzcuMjg4TDI4NC4xNyAzNy44MTY4SDI2OS45NjFMMjc2Ljg4MyAxMS44MzYxWiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTMzMy41MTUgNjEuNzgyOFYxMC4wNzMzSDM1MC41OTdWMS4yMTcxOUgzMDYuNjM2VjEwLjA3MzNIMzIzLjcxOVY2MS43ODI4SDMzMy41MTVaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNMzk2Ljc0NCA2MS43ODI4VjUzLjA1MjZIMzg0Ljc2MlY5Ljk0NzM3SDM5Ni43NDRWMS4yMTcxOUgzNjIuOTg0VjkuOTQ3MzdIMzc0Ljk2NlY1My4wNTI2SDM2Mi45ODRWNjEuNzgyOEgzOTYuNzQ0WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTQzMi40MDcgNTMuODUwMUM0MjQuMzExIDUzLjg1MDEgNDIwLjEwMSA0OC4xODM5IDQyMC4xMDEgMzcuMzU1MVYyNS42NDQ5QzQyMC4xMDEgMTQuODE2MSA0MjQuMzExIDkuMTQ5OSA0MzIuMjg2IDkuMTQ5OUM0MzguODQ0IDkuMTQ5OSA0NDMuMzM3IDE0LjE4NjUgNDQzLjQ5OSAyMS44MjU0SDQ1My40MTZDNDUzLjI1NSA4LjEwMDYgNDQ1LjQ0MiAwIDQzMi40NDggMEM0MTguMjggMCA0MDkuOTgxIDkuNDQzNyA0MDkuOTgxIDI1LjY0NDlWMzcuMzU1MUM0MDkuOTgxIDUzLjU1NjMgNDE4LjI4IDYzIDQzMi40NDggNjNDNDQ1LjE5OSA2MyA0NTMuNDE2IDU0LjgxNTUgNDUzLjQxNiA0MS45M0g0NDMuNDk5QzQ0My4zNzcgNDkuMzE3MSA0MzkuMTY4IDUzLjg1MDEgNDMyLjQwNyA1My44NTAxWiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTQ5NS41MTYgNjEuNzgyOEg1MDZMNDg3Ljk4NiAxLjIxNzE5SDQ3Ni43MzNMNDU4LjcxOSA2MS43ODI4SDQ2OC41MTZMNDcyLjc2NiA0NS44NzU0SDQ5MS4zMDZMNDk1LjUxNiA2MS43ODI4Wk00ODEuODc0IDExLjgzNjFINDgyLjI3OUw0ODkuMTYgMzcuODE2OEg0NzQuOTUyTDQ4MS44NzQgMTEuODM2MVoiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=" />
    <h1>인증 번호</h1>
    <div>
        계정 인증을 위한 번호입니다. 아래 번호는 5분 뒤 만료됩니다.
    </div>
    <h3>${code}</h3>
    <div>
        직접 인증을 요청한 적이 없다면 다른 사람에게 인증 번호를 공유하지 마세요. 개인정보가 도용되었을 수 있으므로 비밀번호 변경이 권장됩니다.
    </div>
    <svg width="250" height="10" viewBox="0 0 250 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="0" width="40" height="10" fill="#DA5858"/>
        <rect x="56" y="0" width="40" height="10" fill="#FCA669"/>
        <rect x="112" y="0" width="40" height="10" fill="#3FC661"/>
        <rect x="168" y="0" width="40" height="10" fill="#497EE9"/>
    </svg>
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
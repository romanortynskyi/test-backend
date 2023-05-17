import { emailSubject } from 'src/consts/email-subject'

export const templateList = {
  [emailSubject.RESET_PASSWORD]: {
    en: {
      subject: 'Reset your account password',
      template: 'en/reset-password',
    },
    ua: {
      subject: 'Скиньте пароль для свого акаунту',
      template: 'ua/reset-password',
    },
  },
  [emailSubject.SUCCESSFUL_PASSWORD_RESET]: {
    en: {
      subject: 'Your password was changed',
      template: 'en/sucessful-password-reset',
    },
    ua: {
      subject: 'Ваш пароль було змінено',
      template: 'ua/sucessful-password-reset',
    },
  },
}

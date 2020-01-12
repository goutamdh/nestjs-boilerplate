// import SparkPostTransport from 'nodemailer-sparkpost-transport';

export default () => ({
  mailer: {
    transport: process.env.MAILER_TRANSPORT || 'smtp://127.0.0.1:25',
    defaults: {
      from: process.env.MAILER_DEFAULTS_FROM || 'noreply@localhost',
    },
    template: {
      templateDir: `${__dirname}/../email-templates`,
      strict: true,
      // Here you can set options for Handlebars, check more here: https://handlebarsjs.com/api-reference/compilation.html
      context: {
        title: process.env.MAILER_TEMPLATE_DEFAULT_TITLE || 'Default e-mail title',
        domain: process.env.MAILER_TEMPLATE_DEFAULT_DOMAIN || 'localhost',
        footerText: process.env.MAILER_TEMPLATE_DEFAULT_FOOTER || '',
        termsOfServiceUrl: process.env.MAILER_TEMPLATE_TOS_URL || null,
        privacyPolicyUrl: process.env.MAILER_TEMPLATE_PP_URL || null,
      }
    },
    // Uncomment below lines if you are using sparkpost.com through REST API
    // transport: SparkPostTransport({
    //   sparkPostApiKey: process.env.SPARKPOST_APIKEY,
    //   endpoint: process.env.SPARKPOST_ENDPOINT,
    // }),
  },
});

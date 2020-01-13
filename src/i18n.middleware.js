import i18n from 'i18n';

i18n.configure({
  locales: ['en', 'pl'],
  directory: `${__dirname}/locales`,
  defaultLocale: 'en',
  cookie: 'lang',
  queryParameter: 'lang',
});

export default (request, response, next) => {
  i18n.init(request, response, next);
};
